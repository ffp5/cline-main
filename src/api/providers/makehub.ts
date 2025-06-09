import { Anthropic } from "@anthropic-ai/sdk"
import axios from "axios"
import { setTimeout as setTimeoutPromise } from "node:timers/promises"
import OpenAI from "openai"
import { ApiHandler } from "../"
import { ApiHandlerOptions, ModelInfo, makehubDefaultModelId, makehubDefaultModelInfo } from "@shared/api"
import { withRetry } from "../retry"
import { ApiStream, ApiStreamUsageChunk } from "../transform/stream"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { convertToR1Format } from "../transform/r1-format"

// Package info for metadata headers
const Package = {
	publisher: "saoudrizwan",
	name: "claude-dev"
}

export interface MakehubModelResponse {
	context: number
	model_id: string
	model_name: string
	display_name?: string
	organisation: string
	price_per_input_token: number
	price_per_output_token: number
	provider_name: string
	quantisation: string | null
	max_tokens?: number
	supports_images?: boolean
	supports_prompt_cache?: boolean
	cache_writes_price?: number
	cache_reads_price?: number
	assistant_ready: boolean
	thinking_config?: {
		max_budget?: number
		output_price?: number
	}
	tiers?: Array<{
		context_window: number
		input_price?: number
		output_price?: number
		cache_writes_price?: number
		cache_reads_price?: number
	}>
	capabilities?: {
		image_input?: boolean
		tool_calling?: boolean
		json_mode?: boolean
	}
}

const MAKEHUB_BASE_URL = "https://api.makehub.ai/v1"
const MAKEHUB_DEFAULT_TEMPERATURE = 0

const DEFAULT_HEADERS = {
	"HTTP-Referer": "https://cline.bot",
	"X-Title": "Cline",
	"X-Makehub-Metadata": JSON.stringify({
		labels: [{ key: "app", value: `vscode.${Package.publisher}.${Package.name}` }],
	}),
}

/**
 * MakeHub API handler for Cline
 * Provides access to multiple AI models through MakeHub's unified API
 * Supports performance/price ratio optimization and model routing
 */
export class MakehubHandler implements ApiHandler {
	private options: ApiHandlerOptions
	private client: OpenAI
	private lastGenerationId?: string

	constructor(options: ApiHandlerOptions) {
		this.options = options
		this.client = new OpenAI({
			baseURL: MAKEHUB_BASE_URL,
			apiKey: this.options.makehubApiKey,
			defaultHeaders: DEFAULT_HEADERS,
		})
	}

	@withRetry()
	async *createMessage(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): ApiStream {
		this.lastGenerationId = undefined
		const model = this.getModel()

		// Convert messages to OpenAI format
		let openAiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
			{ role: "system", content: systemPrompt },
			...convertToOpenAiMessages(messages),
		]

		// Set the price/performance ratio if specified
		const perfRatio = this.options.makehubPerfRatio ?? 0.5 // Default balanced value

		// Check if we need to use R1 format for specific models
		const modelLower = model.id.toLowerCase()
		if (modelLower.includes("deepseek") || modelLower.includes("qwen") || modelLower.includes("qwq")) {
			openAiMessages = convertToR1Format([{ role: "user", content: systemPrompt }, ...messages])
		}

		try {
			// Prepare request options
			const requestOptions: OpenAI.Chat.ChatCompletionCreateParams = {
				model: model.id,
				messages: openAiMessages,
				stream: true,
			}

			// Set temperature if supported
			if (this.supportsTemperature(model.id)) {
				requestOptions.temperature = MAKEHUB_DEFAULT_TEMPERATURE
			}

			// Set performance ratio header
			const headers = {
				...DEFAULT_HEADERS,
				"X-Price-Performance-Ratio": `${Math.round(perfRatio * 100)}`,
			}

			// Make API request with proper headers
			const { data: response } = await this.client.chat.completions
				.create(requestOptions, { headers })
				.withResponse()

			let didOutputUsage: boolean = false
			const modelInfo = model.info

			// Process the response stream
			for await (const chunk of response) {
				// Capture the generation ID for future statistics
				if (!this.lastGenerationId && chunk.id) {
					this.lastGenerationId = chunk.id
				}

				// Skip malformed chunks
				if (!chunk.choices || chunk.choices.length === 0) {
					continue
				}

				const delta = chunk.choices[0]?.delta
				if (delta?.content) {
					yield {
						type: "text",
						text: delta.content,
					}
				}

				// Handle usage statistics if present
				if (!didOutputUsage && chunk.usage) {
					// Validate token counts to prevent unreasonable values
					const promptTokens = chunk.usage.prompt_tokens || 0
					const completionTokens = chunk.usage.completion_tokens || 0

					// Check if token counts are reasonable (typically not more than 100k tokens in a single request)
					const maxReasonableTokens = 100000
					const validPromptTokens = promptTokens > maxReasonableTokens ? maxReasonableTokens : promptTokens
					const validCompletionTokens = completionTokens > maxReasonableTokens ? maxReasonableTokens : completionTokens

					if (promptTokens > maxReasonableTokens || completionTokens > maxReasonableTokens) {
						console.warn("MakeHub returned unusually high token counts, applying limits", {
							original: { promptTokens, completionTokens },
							corrected: { validPromptTokens, validCompletionTokens },
						})
					}

					yield {
						type: "usage",
						inputTokens: validPromptTokens,
						outputTokens: validCompletionTokens,
						totalCost: this.calculateCost(validPromptTokens, validCompletionTokens, modelInfo),
					}
					didOutputUsage = true
				}
			}

			// Retrieve usage statistics if they were not provided in the stream
			if (!didOutputUsage) {
				const apiStreamUsage = await this.getApiStreamUsage()
				if (apiStreamUsage) {
					yield apiStreamUsage
				}
			}
		} catch (error: any) {
			console.error("Error communicating with the MakeHub API:", error)
			
			// Provide more detailed error information
			if (error.response) {
				console.error("MakeHub API Error Response:", {
					status: error.response.status,
					statusText: error.response.statusText,
					data: error.response.data,
				})
				
				// Handle specific error cases
				if (error.response.status === 401) {
					throw new Error("Invalid MakeHub API key. Please check your API key and try again.")
				} else if (error.response.status === 429) {
					throw new Error("Rate limit exceeded. Please wait a moment and try again.")
				} else if (error.response.status >= 500) {
					throw new Error("MakeHub service is temporarily unavailable. Please try again later.")
				}
			} else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
				throw new Error("Unable to connect to MakeHub API. Please check your internet connection.")
			}
			
			throw error
		}
	}

	/**
	 * Calculate the total cost based on input and output tokens
	 */
	private calculateCost(inputTokens: number, outputTokens: number, modelInfo: ModelInfo): number {
		// Validate inputs
		if (!modelInfo || typeof modelInfo.inputPrice !== "number" || typeof modelInfo.outputPrice !== "number") {
			console.warn("MakeHub: Invalid model pricing information", { modelInfo })
			return 0
		}

		if (inputTokens < 0 || outputTokens < 0) {
			console.warn("MakeHub: Invalid token counts", { inputTokens, outputTokens })
			return 0
		}

		const inputCostPerMillion = modelInfo.inputPrice || 0
		const outputCostPerMillion = modelInfo.outputPrice || 0

		const inputCost = (inputTokens / 1_000_000) * inputCostPerMillion
		const outputCost = (outputTokens / 1_000_000) * outputCostPerMillion
		const totalCost = inputCost + outputCost

		// Log for debugging only if cost seems unusual
		if (totalCost > 10) {
			console.log("MakeHub high cost calculation:", {
				inputTokens,
				outputTokens,
				inputPrice: modelInfo.inputPrice,
				outputPrice: modelInfo.outputPrice,
				inputCost,
				outputCost,
				totalCost,
			})
		}

		return Math.max(0, totalCost)
	}

	/**
	 * Check if the model supports temperature parameter
	 */
	private supportsTemperature(modelId: string): boolean {
		// Most models support temperature, but exclude o3-mini variants like OpenAI
		return !modelId.toLowerCase().includes("o3-mini")
	}

	/**
	 * Retrieve usage statistics for a past request
	 */
	async getApiStreamUsage(): Promise<ApiStreamUsageChunk | undefined> {
		if (this.lastGenerationId) {
			// Allow time for the API to finalize statistics
			await setTimeoutPromise(500)
			try {
				// API call to retrieve usage statistics
				const response = await axios.get(`https://api.makehub.ai/v1/completions?id=${this.lastGenerationId}`, {
					headers: {
						Authorization: `Bearer ${this.options.makehubApiKey}`,
						...DEFAULT_HEADERS,
					},
					timeout: 10000,
				})

				const data = response.data
				if (data && data.usage) {
					const modelInfo = this.getModel().info
					return {
						type: "usage",
						cacheWriteTokens: data.usage.cache_writes || 0,
						cacheReadTokens: data.usage.cache_reads || 0,
						inputTokens: data.usage.prompt_tokens || 0,
						outputTokens: data.usage.completion_tokens || 0,
						totalCost: data.usage.total_cost || this.calculateCost(
							data.usage.prompt_tokens || 0,
							data.usage.completion_tokens || 0,
							modelInfo
						),
					}
				}
			} catch (error) {
				// Ignore errors and continue
				console.error("Error retrieving MakeHub usage statistics:", error)
			}
		}
		return undefined
	}

	/**
	 * Retrieve information about the current model
	 */
	getModel(): { id: string; info: ModelInfo } {
		const modelId = this.options.makehubModelId
		const modelInfo = this.options.makehubModelInfo
		if (modelId && modelInfo) {
			return { id: modelId, info: modelInfo }
		}
		return { id: makehubDefaultModelId, info: makehubDefaultModelInfo }
	}
}

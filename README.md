<div align="center">
<sub>

English • [Español](locales/es/README.md) • [Deutsch](locales/de/README.md) • [日本語](locales/ja/README.md) • [简体中文](locales/zh-cn/README.md) • [繁體中文](locales/zh-tw/README.md) • [한국어](locales/ko/README.md)

</sub>
</div>
<br>
<div align="center">
  <h1>MakeHub AI Development Assistant</h1>
  <p align="center">
  <img src="https://media.githubusercontent.com/media/cline/cline/main/assets/docs/demo.gif" width="100%" />
  </p>
  <p>AI-powered autonomous coding agent enhanced with MakeHub.ai's intelligent model routing and cost optimization</p>
  
  <a href="https://makehub.ai" target="_blank"><img src="https://img.shields.io/badge/Visit%20MakeHub.ai-6B46C1?style=for-the-badge&logo=globe&logoColor=white" alt="Visit MakeHub.ai"></a>
  <a href="https://discord.gg/makehub" target="_blank"><img src="https://img.shields.io/badge/Join%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join Discord"></a>
  
</div>
<br>
<br>

<div align="center">

<a href="https://marketplace.visualstudio.com/items?itemName=makehub.makehub-dev" target="_blank"><img src="https://img.shields.io/badge/Download%20on%20VS%20Marketplace-blue?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="Download on VS Marketplace"></a>
<a href="https://github.com/makehub/makehub-cline/discussions/categories/feature-requests" target="_blank"><img src="https://img.shields.io/badge/Feature%20Requests-yellow?style=for-the-badge" alt="Feature Requests"></a>
<a href="https://marketplace.visualstudio.com/items?itemName=makehub.makehub-dev&ssr=false#review-details" target="_blank"><img src="https://img.shields.io/badge/Rate%20%26%20Review-green?style=for-the-badge" alt="Rate & Review"></a>
<a href="https://makehub.ai/docs" target="_blank"><img src="https://img.shields.io/badge/Documentation-6B46C1?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Documentation"></a>

</div>

**MakeHub AI Development Assistant** is an AI-powered **autonomous coding agent** based on Cline and enhanced with MakeHub's intelligent model routing technology. It can:

- Communicate in natural language
- Read and write files directly in your workspace
- Run terminal commands with your permission
- Automate browser actions for web development
- Integrate with multiple AI providers through **MakeHub's intelligent routing**
- Automatically select the **best model for each task** based on performance and cost
- Use the Model Context Protocol (MCP) to extend capabilities

Whether you're building prototypes or production applications, MakeHub AI Development Assistant helps you code faster while optimizing your AI costs through intelligent model selection.

---

## 🎉 About MakeHub.ai

MakeHub.ai provides intelligent AI model routing that automatically selects the best model for each development task. This VS Code extension brings that power directly to your development environment, combining the capabilities of Cline with MakeHub's cost and performance optimization technology.

**Key Benefits:**

- **Smart Model Selection** - Automatically choose the best model for each specific task
- **Cost Optimization** - Balance performance with cost efficiency
- **Multi-Provider Support** - Access models from OpenAI, Anthropic, Google, and more
- **Real-time Analytics** - Monitor usage, costs, and performance

---

## What Can MakeHub AI Development Assistant Do?

- 🚀 **Generate Code** from natural language descriptions
- 🔧 **Refactor & Debug** existing code with error monitoring
- 📝 **Write & Update** documentation and comments
- 🤔 **Answer Questions** about your codebase with context awareness
- 🔄 **Automate** repetitive development tasks
- 🏗️ **Create** new files, folders, and project structures
- 🌐 **Test Web Apps** using integrated browser automation
- 💰 **Optimize AI Costs** through intelligent model routing

## Quick Start

1. [Install MakeHub AI Development Assistant](https://marketplace.visualstudio.com/items?itemName=makehub.makehub-dev)
2. [Get your MakeHub API key](https://makehub.ai) or use your existing AI provider keys
3. Start coding with AI assistance optimized for each task

## Key Features

### Intelligent Model Routing

MakeHub AI Development Assistant integrates with MakeHub.ai's intelligent routing to:

- **Task-Specific Models**: Automatically select the best model for coding, debugging, documentation, etc.
- **Cost Efficiency**: Balance model performance with your budget preferences
- **Provider Diversity**: Access multiple AI providers through a unified interface
- **Fallback Protection**: Automatic failover when models are unavailable

### Autonomous Development Capabilities

The assistant can handle complex development workflows:

- **File Operations**: Create, read, edit, and organize files in your workspace
- **Terminal Integration**: Execute commands and monitor output in real-time
- **Browser Automation**: Test web applications, capture screenshots, and debug issues
- **Error Handling**: Automatically detect and fix compilation errors and linting issues
- **Project Understanding**: Analyze large codebases using AST parsing and intelligent search

### Human-in-the-Loop Safety

Every action requires your approval:

- **Permission System**: Review and approve all file changes and command executions
- **Change Preview**: See exactly what will be modified before approving
- **Rollback Capability**: Undo changes if needed
- **Safe Environment**: No autonomous actions without explicit user consent

### Advanced Integrations

Extend functionality through:

- **MCP Integration**: Use Model Context Protocol for custom tools and external services
- **Multi-Provider Support**: Connect to OpenAI, Anthropic, Google, OpenRouter, and more
- **Custom Instructions**: Personalize the assistant's behavior for your workflow
- **Project Context**: Maintain awareness of your entire codebase and development environment

## Resources

### MakeHub.ai Platform

- **Website:** [https://makehub.ai](https://makehub.ai)
- **API Dashboard:** Monitor usage, costs, and model performance
- **Model Catalog:** Browse available AI models and their capabilities

### Community & Support

- **Discord:** [Join our Discord server](https://discord.gg/makehub) for real-time help and discussions
- **GitHub:** Report [issues](https://github.com/makehub/makehub-cline/issues) or request [features](https://github.com/makehub/makehub-cline/discussions/categories/feature-requests)
- **Documentation:** [Comprehensive guides and tutorials](https://makehub.ai/docs)

---

## Development & Contributing

### Local Setup

1. **Clone** the repository:

```sh
git clone https://github.com/makehub/makehub-cline.git
```

2. **Install dependencies**:

```sh
npm install
cd webview-ui && npm install
```

3. **Run the extension**:

Press `F5` (or **Run** → **Start Debugging**) in VSCode to open a new window with the extension running.

Changes to the webview will appear immediately. Changes to the core extension will require restarting the extension host.

### Building for Distribution

Build a `.vsix` package for manual installation:

```sh
npm run package
```

The `.vsix` file can be installed with:

```sh
code --install-extension makehub-<version>.vsix
```

---

## Disclaimer

**Please note** that MakeHub.ai does **not** make any representations or warranties regarding any code, models, or other tools provided or made available in connection with MakeHub AI Development Assistant, any associated third-party tools, or any resulting outputs. You assume **all risks** associated with the use of any such tools or outputs; such tools are provided on an **"AS IS"** and **"AS AVAILABLE"** basis. Such risks may include, without limitation, intellectual property infringement, cyber vulnerabilities or attacks, bias, inaccuracies, errors, defects, viruses, downtime, property loss or damage, and/or personal injury. You are solely responsible for your use of any such tools or outputs (including, without limitation, the legality, appropriateness, and results thereof).

---

## Contributing

We welcome community contributions! This project is based on Cline and enhanced with MakeHub's technology. Please read our contributing guidelines before submitting pull requests.

---

## Acknowledgments

This project is based on [Cline](https://github.com/cline/cline) and enhanced with MakeHub.ai's intelligent model routing technology. We thank the original Cline team and contributors for their excellent work in creating this powerful AI development assistant.

## License

[Apache 2.0 © 2025 MakeHub.ai](./LICENSE)

---

**Enjoy MakeHub AI Development Assistant!** Experience the power of AI-assisted development with intelligent model selection and cost optimization. Whether you're building prototypes or production applications, MakeHub helps you code smarter and spend less. Visit [MakeHub.ai](https://makehub.ai) to learn more about our intelligent AI model routing platform.

> [!TIP]
> Use the `CMD/CTRL + Shift + P` shortcut to open the command palette and type "MakeHub: Open In New Tab" to open the extension as a tab in your editor. This lets you use MakeHub side-by-side with your file explorer, and see how it changes your workspace more clearly.

---

<img align="right" width="340" src="https://github.com/user-attachments/assets/3cf21e04-7ce9-4d22-a7b9-ba2c595e88a4">

### Use any API and Model

Cline supports API providers like OpenRouter, Anthropic, OpenAI, Google Gemini, AWS Bedrock, Azure, GCP Vertex, and Cerebras. You can also configure any OpenAI compatible API, or use a local model through LM Studio/Ollama. If you're using OpenRouter, the extension fetches their latest model list, allowing you to use the newest models as soon as they're available.

The extension also keeps track of total tokens and API usage cost for the entire task loop and individual requests, keeping you informed of spend every step of the way.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/81be79a8-1fdb-4028-9129-5fe055e01e76">

### Run Commands in Terminal

Thanks to the new [shell integration updates in VSCode v1.93](https://code.visualstudio.com/updates/v1_93#_terminal-shell-integration-api), Cline can execute commands directly in your terminal and receive the output. This allows him to perform a wide range of tasks, from installing packages and running build scripts to deploying applications, managing databases, and executing tests, all while adapting to your dev environment & toolchain to get the job done right.

For long running processes like dev servers, use the "Proceed While Running" button to let Cline continue in the task while the command runs in the background. As Cline works he’ll be notified of any new terminal output along the way, letting him react to issues that may come up, such as compile-time errors when editing files.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="400" src="https://github.com/user-attachments/assets/c5977833-d9b8-491e-90f9-05f9cd38c588">

### Create and Edit Files

Cline can create and edit files directly in your editor, presenting you a diff view of the changes. You can edit or revert Cline's changes directly in the diff view editor, or provide feedback in chat until you're satisfied with the result. Cline also monitors linter/compiler errors (missing imports, syntax errors, etc.) so he can fix issues that come up along the way on his own.

All changes made by Cline are recorded in your file's Timeline, providing an easy way to track and revert modifications if needed.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/bc2e85ba-dfeb-4fe6-9942-7cfc4703cbe5">

### Use the Browser

With Claude 3.5 Sonnet's new [Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use) capability, Cline can launch a browser, click elements, type text, and scroll, capturing screenshots and console logs at each step. This allows for interactive debugging, end-to-end testing, and even general web use! This gives him autonomy to fixing visual bugs and runtime issues without you needing to handhold and copy-pasting error logs yourself.

Try asking Cline to "test the app", and watch as he runs a command like `npm run dev`, launches your locally running dev server in a browser, and performs a series of tests to confirm that everything works. [See a demo here.](https://x.com/sdrzn/status/1850880547825823989)

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="350" src="https://github.com/user-attachments/assets/ac0efa14-5c1f-4c26-a42d-9d7c56f5fadd">

### "add a tool that..."

Thanks to the [Model Context Protocol](https://github.com/modelcontextprotocol), Cline can extend his capabilities through custom tools. While you can use [community-made servers](https://github.com/modelcontextprotocol/servers), Cline can instead create and install tools tailored to your specific workflow. Just ask Cline to "add a tool" and he will handle everything, from creating a new MCP server to installing it into the extension. These custom tools then become part of Cline's toolkit, ready to use in future tasks.

-   "add a tool that fetches Jira tickets": Retrieve ticket ACs and put Cline to work
-   "add a tool that manages AWS EC2s": Check server metrics and scale instances up or down
-   "add a tool that pulls the latest PagerDuty incidents": Fetch details and ask Cline to fix bugs

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="360" src="https://github.com/user-attachments/assets/7fdf41e6-281a-4b4b-ac19-020b838b6970">

### Add Context

**`@url`:** Paste in a URL for the extension to fetch and convert to markdown, useful when you want to give Cline the latest docs

**`@problems`:** Add workspace errors and warnings ('Problems' panel) for Cline to fix

**`@file`:** Adds a file's contents so you don't have to waste API requests approving read file (+ type to search files)

**`@folder`:** Adds folder's files all at once to speed up your workflow even more

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="350" src="https://github.com/user-attachments/assets/140c8606-d3bf-41b9-9a1f-4dbf0d4c90cb">

### Checkpoints: Compare and Restore

As Cline works through a task, the extension takes a snapshot of your workspace at each step. You can use the 'Compare' button to see a diff between the snapshot and your current workspace, and the 'Restore' button to roll back to that point.

For example, when working with a local web server, you can use 'Restore Workspace Only' to quickly test different versions of your app, then use 'Restore Task and Workspace' when you find the version you want to continue building from. This lets you safely explore different approaches without losing progress.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

## Contributing

To contribute to the project, start with our [Contributing Guide](CONTRIBUTING.md) to learn the basics. You can also join our [Discord](https://discord.gg/cline) to chat with other contributors in the `#contributors` channel. If you're looking for full-time work, check out our open positions on our [careers page](https://cline.bot/join-us)!

<details>
<summary>Local Development Instructions</summary>

1. Clone the repository _(Requires [git-lfs](https://git-lfs.com/))_:
    ```bash
    git clone https://github.com/cline/cline.git
    ```
2. Open the project in VSCode:
    ```bash
    code cline
    ```
3. Install the necessary dependencies for the extension and webview-gui:
    ```bash
    npm run install:all
    ```
4. Launch by pressing `F5` (or `Run`->`Start Debugging`) to open a new VSCode window with the extension loaded. (You may need to install the [esbuild problem matchers extension](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers) if you run into issues building the project.)

</details>

<details>
<summary>Creating a Pull Request</summary>

1. Before creating a PR, generate a changeset entry:
    ```bash
    npm run changeset
    ```
   This will prompt you for:
   - Type of change (major, minor, patch)
     - `major` → breaking changes (1.0.0 → 2.0.0)
     - `minor` → new features (1.0.0 → 1.1.0)
     - `patch` → bug fixes (1.0.0 → 1.0.1)
   - Description of your changes

2. Commit your changes and the generated `.changeset` file

3. Push your branch and create a PR on GitHub. Our CI will:
   - Run tests and checks
   - Changesetbot will create a comment showing the version impact
   - When merged to main, changesetbot will create a Version Packages PR
   - When the Version Packages PR is merged, a new release will be published

</details>


## License

[Apache 2.0 © 2025 Cline Bot Inc.](./LICENSE)

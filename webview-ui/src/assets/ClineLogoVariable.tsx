import { ImgHTMLAttributes } from "react"
import iconSvg from "./icon.svg"

/**
 * MakeHubLogoVariable component renders the MakeHub logo with automatic theme adaptation.
 *
 * This component uses CSS filters to adapt the logo color based on the VS Code theme,
 * which automatically adjusts based on the active VS Code theme (light, dark, high contrast)
 * to ensure optimal contrast with the background.
 *
 * @param {ImgHTMLAttributes<HTMLImageElement>} props - Standard img props including className, style, etc.
 * @returns {JSX.Element} MakeHub logo that adapts to VS Code themes
 */
const MakeHubLogoVariable = (props: ImgHTMLAttributes<HTMLImageElement>) => (
	<img
		src={iconSvg}
		alt="MakeHub Logo"
		width="47"
		height="50"
		style={{
			// Use CSS to adapt to theme colors - this will work with most VS Code themes
			filter: 'var(--vscode-icon-foreground-filter, none)',
			...props.style
		}}
		{...props}
	/>
)
export default MakeHubLogoVariable

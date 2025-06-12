import { ImgHTMLAttributes } from "react"
import iconSvg from "./icon.svg"

const MakeHubLogoBlack = (props: ImgHTMLAttributes<HTMLImageElement>) => (
	<img
		src={iconSvg}
		alt="MakeHub Logo"
		width="47"
		height="50"
		style={{ filter: 'brightness(0)' }} // Makes the image black
		{...props}
	/>
)
export default MakeHubLogoBlack

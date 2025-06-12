import { ImgHTMLAttributes } from "react"
import iconSvg from "./icon.svg"

const MakeHubLogoWhite = (props: ImgHTMLAttributes<HTMLImageElement>) => (
	<img
		src={iconSvg}
		alt="MakeHub Logo"
		width="47"
		height="50"
		style={{ filter: 'brightness(0) invert(1)' }} // Makes the image white
		{...props}
	/>
)
export default MakeHubLogoWhite

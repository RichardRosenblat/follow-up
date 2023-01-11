import FadeIn from "react-fade-in/lib/FadeIn";
import Style from "./ErrorMessage.module.scss";
import { IconType } from "react-icons";
import { IconBaseProps } from "react-icons/lib";
import { BiErrorCircle } from "react-icons/bi";

interface props {
	icon?: IconType | ((props: unknown) => JSX.Element);
	iconProps?: IconBaseProps & { [key: string]: unknown };
	children?: React.ReactNode;
}

export default function ErrorMessage({ icon = BiErrorCircle, children, iconProps = {} }: props) {
	return (
		<div className={Style.error}>
			<FadeIn delay={50}>{icon({ size: "50%", color: "#F40076", ...iconProps })}</FadeIn>
			<FadeIn delay={150}>
				<div className={Style.error__message}>
					{children || (
						<>
							An <b>Error</b> has ocurred, please,{" "}
							<button onClick={() => window.location.reload()}>try again</button> later.
							<br />
							We are sorry for the incovenience!
						</>
					)}
				</div>
			</FadeIn>
		</div>
	);
}

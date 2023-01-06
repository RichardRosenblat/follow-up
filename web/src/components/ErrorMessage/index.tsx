import Style from "./ErrorMessage.module.scss";
import FadeIn from "react-fade-in/lib/FadeIn";
import { BiErrorCircle } from "react-icons/bi";

export default function ErrorMessage() {
	return <div className={Style.error}>
		<FadeIn delay={50}>
			<BiErrorCircle size="50%" color="#F40076" />
		</FadeIn>
		<FadeIn delay={150}>
			<div className={Style.error__message}>
				An <b>Error</b> has ocurred, please,{" "}
				<button onClick={() => window.location.reload()}>try again</button> later.
				<br />
				We are sorry for the incovenience!
			</div>
		</FadeIn>
	</div>;
}

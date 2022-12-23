import Style from "./Loader.module.scss";
import FadeIn from "react-fade-in/lib/FadeIn";
import {  RotateLoader } from "react-spinners";

interface props {
	isHidden: boolean;
}

export default function Loader({ isHidden }: props) {
	return (
		<FadeIn>
			<div className={Style[`loader${isHidden ? "" : "--hidden"}`]}>
				<RotateLoader color="#FFFFFF" loading={isHidden} />
			</div>
		</FadeIn>
	);
}

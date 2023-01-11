import Style from "./Loader.module.scss";
import FadeIn from "react-fade-in/lib/FadeIn";
import { RotateLoader } from "react-spinners";

interface props {
	isHidden: boolean;
}

export default function Loader({ isHidden }: props) {
	const isHiddenClassname = isHidden ? "" : "--hidden";
	return (
		<FadeIn>
			<div className={Style[`loader${isHiddenClassname}`]}>
				<RotateLoader color="#FFFFFF" loading={isHidden} />
			</div>
		</FadeIn>
	);
}

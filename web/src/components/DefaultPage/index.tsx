import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import style from './DefaultPage.module.scss'

interface props {
	children?: React.ReactNode;
}

export default function DefaultPage({ children }: props) {
	return (
		<>
			<Navbar />
			<section className={style.body}>
				<Outlet />
				{children}
			</section>
		</>
	);
}

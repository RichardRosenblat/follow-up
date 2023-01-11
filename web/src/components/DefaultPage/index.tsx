import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

interface props {
	children?: React.ReactNode;
}

export default function DefaultPage({ children }: props) {
	return (
		<>
			<Navbar />
			<Outlet />
			{children}
		</>
	);
}

import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import styles from "./Navbar.module.scss";

export default function Navbar() {
	const location = useLocation();
	const pages = [
		{ label: "Dashboard", location: "/" },
		{ label: "Followers", location: "/followers" },
	];
	return (
		<nav className={styles.navigation__bar}>
			<Logo height={50} width={50} className={styles.navigation__image} />
			<header className={styles.navigation__title}>
				<b>
					<Link to="/">FollowUp</Link>
				</b>
			</header>
			<div className={styles.navigation__options}>
				{pages.map((page, index) => (
					<div
						key={index}
						className={
							styles[
								`navigation__options__option${location.pathname === page.location ? "--active" : ""}`
							]
						}
					>
						<Link to={page.location}>{page.label}</Link>
					</div>
				))}
			</div>
		</nav>
	);
}

import { ReactComponent as Logo } from "../../assets/logo.svg";
import styles from "./Navbar.module.scss";

export default function Navbar() {
	return (
		<nav className={styles.navigation__bar}>
			<Logo height={50} width={50} className={styles.navigation__image} />
			<div className={styles.navigation__title}>
				<b>FollowUp</b>
			</div>
			<div className={styles.navigation__options}>
				<div className={styles.navigation__options__option}>Dashboard</div>
				<div className={styles.navigation__options__option}>Followers</div>
			</div>
			
		</nav>
	);
}

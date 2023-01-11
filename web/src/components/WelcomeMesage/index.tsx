import styles from "./WelcomeMessage.module.scss";

interface props {
	name: string;
	to: string;
}

export default function WelcomeMessage({ name, to: location }: props) {
	return (
		<div className={styles.message__container}>
			Welcome, <b>{name}</b>, your {location}.
		</div>
	);
}

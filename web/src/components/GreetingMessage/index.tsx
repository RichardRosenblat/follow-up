import styles from "./GreetingMessage.module.scss";

interface props {
	name: string;
}

export default function GreetingMessage({ name }: props) {
	return (
		<div className={styles.message__container}>
			Greetings, <b>{name}</b>, your Stories' Feed.
		</div>
	);
}

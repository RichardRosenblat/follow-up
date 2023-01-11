import Style from './Story.module.scss'
interface props {
	name: string;
	createdAt: string;
	title: string;
	content: string;
	impressions:number
}

export default function Story(data: props) {
	const formattedDate = new Intl.DateTimeFormat("pt-br").format(new Date(data.createdAt));
	return (
		<>
			<section className={Style.story}>
				<header>
					<b className={Style.story__user}>{data.name}</b>, em {formattedDate} <br />
					<div><b>{data.impressions}</b> impressions</div>
				</header>
				<h3 className={Style.story__title}>{data.title}</h3>
				<article>{data.content}</article>
			</section>
			<div className={Style.divisor}></div>
		</>
	);
}

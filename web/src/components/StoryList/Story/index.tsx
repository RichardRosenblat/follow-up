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
			<article className={Style.story}>
				<div>
					<b className={Style.story__user}>{data.name}</b>, em {formattedDate} <br />
					<div><b>{data.impressions}</b> impressions</div>
				</div>
				<h4 className={Style.story__title}>{data.title}</h4>
				<div>{data.content}</div>
			</article>
			<div className={Style.divisor}></div>
		</>
	);
}

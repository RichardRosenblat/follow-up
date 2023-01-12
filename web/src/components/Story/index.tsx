import { useNavigate } from "react-router-dom";
import { IStoryWithUserData } from "../../types/userAndStory.type";
import Style from "./Story.module.scss";

type props = Pick<IStoryWithUserData, "name" | "createdAt" | "title" | "content" | "impressions" | "userId">;

export default function Story({ content, createdAt, impressions, name, title, userId }: props) {
	const navigate = useNavigate();
	const formattedDate = new Intl.DateTimeFormat("pt-br").format(new Date(createdAt));
	return (
		<>
			<section className={Style.story}>
				<header>
					<b className={Style.story__user} onClick={() => navigate(`/profile/${userId}`)} tabIndex={0}>
						{name}
					</b>
					, em {formattedDate} <br />
					<div>
						<b>{impressions}</b> impressions
					</div>
				</header>
				<h3 className={Style.story__title}>{title}</h3>
				<article>{content}</article>
			</section>
		</>
	);
}

import { useNavigate } from "react-router-dom";
import { IStoryWithUserData } from "../../types/userAndStory.type";
import Style from "./Story.module.scss";

type props = Pick<IStoryWithUserData, "name" | "createdAt" | "title" | "content" | "impressions" | "userId">;

export default function Story(story: props) {
	const navigate = useNavigate();
	const formattedDate = new Intl.DateTimeFormat("pt-br").format(new Date(story.createdAt));
	return (
		<>
			<article className={Style.story}>
				<b className={Style.story__user} onClick={() => navigate(`/profile/${story.userId}`)} tabIndex={0}>
					{story.name}
				</b>
				, em <time>{formattedDate}</time>
				<p className={Style.story__impressions}>
					<b>{story.impressions}</b> impressions
				</p>
				<h3 className={Style.story__title}>{story.title}</h3>
				<p className={Style.story__content}>{story.content}</p>
			</article>
		</>
	);
}

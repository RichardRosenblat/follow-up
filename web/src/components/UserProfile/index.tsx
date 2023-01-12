import { IStory } from "../../types/story.type";
import { IUser } from "../../types/user.type";
import { IStoryWithUserData } from "../../types/userAndStory.type";
import Divisor from "../Divisor";
import Style from "./UserProfile.module.scss";
import StoryList from "../StoryList";
import User from "../User";
import FadeIn from "react-fade-in/lib/FadeIn";

interface props {
	user: IUser;
	stories: IStory[];
}

export default function Profile({ user, stories }: props) {
	const storiesWithUserData = stories.map((story) => {
		const { id: userId, ...userData } = user;
		return { ...story, ...userData } as IStoryWithUserData;
	});
	return (
		<FadeIn delay={100}>
			<Divisor />
			<User {...user} />
			<Divisor />
			{stories.length ? (
				<StoryList storiesWithUserData={storiesWithUserData} />
			) : (
				<div className={Style.message}>This person is yet to post their first story</div>
			)}
		</FadeIn>
	);
}

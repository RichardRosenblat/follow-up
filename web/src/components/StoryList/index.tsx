import FadeIn from "react-fade-in";
import { IStoryWithUserData } from "../../types/userAndStory.type";
import Story from "./Story";

interface props {
	storiesWithUserData: IStoryWithUserData[];
}

export default function StoryList({ storiesWithUserData: stories }: props) {
	const orderedStories = stories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	return (
		<div>
			<FadeIn delay={90}>
				{orderedStories.map((storyData) => (
					<Story key={storyData.id} {...storyData} />
				))}
			</FadeIn>
		</div>
	);
}

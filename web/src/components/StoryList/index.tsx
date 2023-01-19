import FadeIn from "react-fade-in";
import { IStoryWithUserData } from "../../types/userAndStory.type";
import Story from "../Story";
import Divisor from "../Divisor";
import React from "react";

interface props {
	storiesWithUserData: IStoryWithUserData[];
}

export default function StoryList({ storiesWithUserData: stories }: props) {
	const orderedStories = stories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	return (
		<div>
			<FadeIn delay={90}>
				{orderedStories.map((storyData) => (
					<React.Fragment key={storyData.id}>
						<Story {...storyData} />
						<Divisor />
					</React.Fragment>
				))}
			</FadeIn>
		</div>
	);
}

import GreetingMessage from "../components/GreetingMessage";
import Navbar from "../components/Navbar";
import StoryList from "../components/StoryList";
import { IStoryWithUserData } from "../types/userAndStory.type";
import { useEffect, useState } from "react";
import { IUser } from "../types/user.type";
import FadeIn from "react-fade-in/lib/FadeIn";
import { IStory } from "../types/story.type";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { getAxiosToApi } from "../utils/axios";

export default function Feed() {
	const loggedUserId = "63a34539a961c792121e585b";

	const [isLoading, setIsLoading] = useState(true);
	const [hasErrorOcurred, sethasErrorOcurred] = useState(false);
	const [loggedUserName, setLoggedUserName] = useState("");
	const [stories, setStories] = useState<IStoryWithUserData[]>([]);

	useEffect(() => {
		getStories();
		getUserName();

		function getStories() {
			getAxiosToApi("stories")
				.get<IStory[]>(`/v1/story`)
				.then(async ({ data: stories }) => {
					const userIds = stories.map((story) => story.userId);

					const storiesWithUserData: IStoryWithUserData[] = [];

					for (let index = 0; index < userIds.length; index++) {
						const userId = userIds[index];
						const story = stories[index];
						try {
							const { data } = await getAxiosToApi("users").get<IUser>(`/users/${userId}`);
							const { id, ...user } = data;
							storiesWithUserData.push({
								...user,
								...story,
							});
						} catch {
							console.error(`Failure in User by id Request for id ${userId}`);
							sethasErrorOcurred(true);
						}
					}

					setStories(storiesWithUserData);
				})
				.catch(() => {
					console.error("Failure in List all Stories Request");
					sethasErrorOcurred(true);
				});
		}
		function getUserName() {
			getAxiosToApi("users")
				.get<IUser>(`/users/${loggedUserId}`)
				.then(({ data }) => {
					setLoggedUserName(data.name);
				})
				.catch(() => {
					console.error("Failure in Get Logged User Name Request");
					sethasErrorOcurred(true);
				});
		}
	}, []);

	useEffect(() => {
		if (loggedUserName && stories.length) {
			setIsLoading(false);
		}
	}, [loggedUserName, stories]);

	return (
		<>
			<Navbar />
			{hasErrorOcurred && <ErrorMessage />}

			<Loader isHidden={!hasErrorOcurred && isLoading} />

			{!hasErrorOcurred && !isLoading && (
				<FadeIn>
					<GreetingMessage name={loggedUserName} />
					<StoryList stories={stories} />
				</FadeIn>
			)}
		</>
	);
}

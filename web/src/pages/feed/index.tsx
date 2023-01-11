import FadeIn from "react-fade-in/lib/FadeIn";
import StoryList from "../../components/StoryList";

import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import WelcomeMessage from "../../components/WelcomeMesage";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getUserById } from "../../services/users/byId";
import { getAllStories } from "../../services/stories/getAll";
import { IUser } from "../../types/user.type";
import { IStoryWithUserData } from "../../types/userAndStory.type";

const queryClient = new QueryClient();

interface props {
	userId: string;
}

export function Feed({ userId }: props) {
	const {
		data: activeUser,
		isError: isErrorActiveUser,
		isLoading: isLoadingActiveUser,
	} = useQuery("getActiveUser", async () => (await getUserById(userId)).data);
	const {
		data: stories,
		isError: isErrorStories,
		isLoading: isLoadingStories,
	} = useQuery("getStories", async () => {
		const stories = (await getAllStories()).data;
		const storiesWithUserData: IStoryWithUserData[] = [];
		for (let index = 0; index < stories.length; index++) {
			const story = stories[index];

			// if cannot get the user that created the story, retry 3 times before throwing error
			let user: IUser | null = null;
			for (let j = 0; j < 3; j++) {
				try {
					user = (await getUserById(story.userId)).data;
				} catch (error) {
					if (j === 2) {
						throw error;
					}
				}
				if (user) {
					break;
				}
			}
			const { id, ...userWIthoutId } = user as IUser;
			storiesWithUserData.push({ ...story, ...userWIthoutId });
		}
		return storiesWithUserData;
	});

	const isError = isErrorStories || isErrorActiveUser;
	const isLoading = isLoadingStories && isLoadingActiveUser;

	return (
		<>
			{isError && <ErrorMessage />}

			<Loader isHidden={isError || !isLoading} />

			{!isError && !isLoading && (
				<FadeIn>
					<WelcomeMessage name={activeUser?.name || ""} to={"Stories' Feed"} />
					<StoryList storiesWithUserData={stories || []} />
				</FadeIn>
			)}
		</>
	);
}
export default function FeedProvider(props: props) {
	return (
		<QueryClientProvider client={queryClient}>
			<Feed {...props} />
		</QueryClientProvider>
	);
}

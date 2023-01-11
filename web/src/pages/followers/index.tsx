import FadeIn from "react-fade-in/lib/FadeIn";
import UsersList from "../../components/UsersList";
import WelcomeMessage from "../../components/WelcomeMesage";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getAllUsers } from "../../services/users/getAll";

const queryClient = new QueryClient();

interface props {
	userId: string;
}

export function Followers({ userId }: props) {
	const { data, isError, isLoading } = useQuery(
		"getUsers",
		async () => {
			const users = (await getAllUsers()).data;
			const activeUserIndex = users.findIndex((user) => user.id === userId);
			const activeUser = users.splice(activeUserIndex, 1)[0];
			return { activeUser, users };
		},
		{ retry: 2 }
	);

	return (
		<>
			{isError && <ErrorMessage />}
			<Loader isHidden={isError || !isLoading} />
			{!isError && !isLoading && (
				<FadeIn delay={50}>
					<WelcomeMessage name={data?.activeUser.name || ""} to="Followers' list" />
					<UsersList users={data?.users || []} />
				</FadeIn>
			)}
		</>
	);
}

export default function FollowersProvider(props: props) {
	return (
		<QueryClientProvider client={queryClient}>
			<Followers {...props} />
		</QueryClientProvider>
	);
}

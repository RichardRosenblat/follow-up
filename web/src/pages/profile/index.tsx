import { MdOutlinePersonOff } from "react-icons/md";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import { getStoriesByUserId } from "../../services/stories/getByUserId";
import { getUserById } from "../../services/users/byId";
import { IUser } from "../../types/user.type";

interface props {
	userId: string;
}

const queryClient = new QueryClient();

export function Profile({ userId: loggedUserId }: props) {
	const { id } = useParams();
	const navigate = useNavigate();

	const profileId = id === "self" ? loggedUserId : id || "";

	const {
		data: user,
		isError: isErrorUser,
		isLoading: isLoadingUser,
	} = useQuery(
		"getUser",
		async () => {
			return (await getUserById(profileId)).data;
		},
		{ retry: 2 }
	);
	const {
		data: stories,
		isError: isErrorStories,
		isLoading: isLoadingStories,
	} = useQuery(
		"getStories",
		async () => {
			return (await getStoriesByUserId(profileId)).data;
		},
		{ retry: 2 }
	);

	const isError = isErrorUser || isErrorStories;
	const isLoading = isLoadingUser || isLoadingStories;

	const emptyUser: IUser = {
		id: "",
		name: "",
		email: "",
		password: "",
		creationDate: "",
	};
	return (
		<>
			{isError && (
				<ErrorMessage icon={MdOutlinePersonOff}>
					The <b>person</b> you searched <b>does not exist</b>
					<br />
					<button onClick={() => navigate(-1)}>Click here</button> to go back.
				</ErrorMessage>
			)}
			<Loader isHidden={isError || !isLoading} />
			{!(isError || isLoading) && <UserProfile stories={stories || []} user={user || emptyUser} />}
		</>
	);
}

export default function ProfileProvider(props: props) {
	return (
		<QueryClientProvider client={queryClient}>
			<Profile {...props} />
		</QueryClientProvider>
	);
}

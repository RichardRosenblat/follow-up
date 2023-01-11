import FadeIn from "react-fade-in";
import { IUser } from "../../types/user.type";
import User from "./User";

interface props {
	users: IUser[];
}

export default function UsersList({ users }: props) {
	return (
		<div>
			<FadeIn delay={90}>
				{users.map((user) => (
					<User key={user.id} {...user} />
				))}
			</FadeIn>
		</div>
	);
}

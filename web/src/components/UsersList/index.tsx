import FadeIn from "react-fade-in";
import { IUser } from "../../types/user.type";
import User from "../User";
import Divisor from "../Divisor";
import React from "react";

interface props {
	users: IUser[];
}

export default function UsersList({ users }: props) {
	return (
		<div>
			<FadeIn delay={90}>
				{users.map((user) => (
					<React.Fragment key={user.id}>
						<User key={user.id} {...user} />
						<Divisor />
					</React.Fragment>
				))}
			</FadeIn>
		</div>
	);
}

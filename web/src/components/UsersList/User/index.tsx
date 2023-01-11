import { IUser } from "../../../types/user.type";
import Divisor from "../../Divisor";
import Style from "./User.module.scss";
import { HiOutlineUserCircle } from "react-icons/hi";

type props = Pick<IUser, "name" | "creationDate">;

export default function User(userData: props) {
	const formattedDate = new Intl.DateTimeFormat("pt-br").format(new Date(userData.creationDate));
	return (
		<>
			<div className={Style.user}>
				<HiOutlineUserCircle className={Style.user__icon} size={"8%"} color="#ffffff" />
				<div className={Style.user__details}>
					<header className={Style.user__details__name}>
						<b>{userData.name}</b>
					</header>
					<div className={Style.user__details__since}>since: {formattedDate}</div>
				</div>
			</div>
			<Divisor />
		</>
	);
}

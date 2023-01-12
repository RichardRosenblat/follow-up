import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user.type";
import Style from "./User.module.scss";

type props = Pick<IUser, "id" | "name" | "creationDate">;

export default function User({ creationDate, id, name }: props) {
	const formattedDate = new Intl.DateTimeFormat("pt-br").format(new Date(creationDate));
	const navigate = useNavigate();
	const goToProfile = () => navigate(`/profile/${id}`);
	return (
		<>
			<div className={Style.user}>
				<HiOutlineUserCircle
					className={Style.user__icon}
					size={"8%"}
					color="#ffffff"
					tabIndex={0}
					onClick={goToProfile}
				/>
				<div className={Style.user__details}>
					<header className={Style.user__details__name} tabIndex={0} onClick={goToProfile}>
						<b>{name}</b>
					</header>
					<div className={Style.user__details__since}>since: {formattedDate}</div>
				</div>
			</div>
		</>
	);
}

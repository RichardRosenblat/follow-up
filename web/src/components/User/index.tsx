import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user.type";
import Style from "./User.module.scss";
import { IconBaseProps } from "react-icons";

type props = Omit<IUser, "password"> & { showEmail?: boolean; iconProps?: IconBaseProps };

export default function User({ showEmail = false, iconProps = {}, ...user }: props) {
	const formattedDate = new Intl.DateTimeFormat("pt-br").format(new Date(user.creationDate));
	const navigate = useNavigate();
	const goToProfile = () => navigate(`/profile/${user.id}`);
	return (
		<>
			<div className={Style.user}>
				<HiOutlineUserCircle
					className={Style.user__icon}
					{...{ size: "70px", color: "#ffffff", tabIndex: 0, ...iconProps }}
					onClick={goToProfile}
				/>
				<div className={Style.user__details}>
					<header className={Style.user__details__name} tabIndex={0} onClick={goToProfile}>
						<b>{user.name}</b> 
					</header>
					<span className={Style.user__details__email}>{showEmail ? `${user.email}` : ""}</span>
					<div className={Style.user__details__since}>since: {formattedDate}</div>
				</div>
			</div>
		</>
	);
}

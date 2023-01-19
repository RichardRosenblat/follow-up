import { IUser } from "../../types/user.type";
import { getAxiosToApi } from "../../utils/axios";

export function getUserById(userId: string) {
	return getAxiosToApi("users").get<IUser>(`/users/${userId}`);
}

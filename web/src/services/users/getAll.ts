import { IUser } from "../../types/user.type";
import { getAxiosToApi } from "../../utils/axios";

export function getAllUsers() {
	return  getAxiosToApi("users").get<IUser[]>(`/users`);
}

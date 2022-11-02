import { UserEntity } from "../../src/entities/user.entity.js";

export function userToLiteral(user) {
	if (!(user instanceof UserEntity)) {
		return user
	}
	return {
		name: user.name,
		email: user.email,
		password: user.password,
		id: user.id,
		creationDate: user.creationDate,
	};
}
export function userToLiteralWithFormattedDate(user) {
	if (!(user instanceof UserEntity)) {
		return user
	}
	return {
		name: user.name,
		email: user.email,
		password: user.password,
		id: user.id,
		creationDate: user.creationDate.toISOString().slice(0,10),
	};
}

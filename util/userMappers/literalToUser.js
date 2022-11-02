import { UserEntity } from "../../src/entities/user.entity.js"

export function literalToUser({ name, email, password, id, creationDate }) {
	return new UserEntity(name, email, password, id, creationDate);
}

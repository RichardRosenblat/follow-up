import fs from "fs";
import { literalToUser } from "../../util/userMappers/literalToUser.js";
import { userToLiteral } from "../../util/userMappers/userToLiteral.js";

export class UserRepository {
	#cache;
	#path;

	get path() {
		return this.#path;
	}

	constructor(path = "data/users.json") {
		this.#path = path;
	}

	save(user) {
		const savedList = this.list();
		savedList.push(user);

		const literalList = savedList.map((user) => userToLiteral(user));
		const usersString = JSON.stringify(literalList);
		fs.writeFileSync(this.path, usersString);
		return user;
	}

	list() {
		if (!this.cache) {
			try {
				const parsedJson = JSON.parse(fs.readFileSync(this.path))
				this.#cache = parsedJson.map((literal) => literalToUser(literal));
			} catch {
				this.#cache = [];
			}
		}
		return this.#cache;
	}

	doesEmailAlreadyExist(email) {
		return this.list()
			.map((user) => user.email)
			.includes(email);
	}
}

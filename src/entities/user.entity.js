import crypto from "crypto";
export class UserEntity {
	#id;
	#name;
	#email;
	#password;
	#creationDate;

	get id() {
		return this.#id;
	}
	get name() {
		return this.#name;
	}
	get email() {
		return this.#email;
	}
	get password() {
		return this.#password;
	}
	get creationDate() {
		return this.#creationDate;
	}

	constructor(name, email, password, id, creationDate) {
		this.#id = id || crypto.randomUUID();
		this.#name = name;
		this.#email = email;
		this.#password = password;
		this.#creationDate = creationDate ? new Date(creationDate) : new Date();
	}
}

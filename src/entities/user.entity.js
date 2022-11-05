import { ObjectId } from "mongodb";

export class UserEntity {
	#_id;
	#name;
	#email;
	#password;
	#creationDate;
	#posts;

	get _id() {
		return this.#_id;
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
	get posts() {
		return this.#posts;
	}

	constructor({ _id, name, email, password, posts, creationDate }) {
		this.#_id = new ObjectId(_id);
		this.#name = name;
		this.#email = email;
		this.#password = password;
		this.#posts = posts ? posts.map((post) => new ObjectId(post)) : [];
		this.#creationDate = creationDate ? new Date(creationDate) : new Date();

		Object.freeze(this.#posts);
		Object.freeze(this.#creationDate);
	}

	toLiteral() {
		return {
			_id: this._id,
			name: this.name,
			email: this.email,
			password: this.password,
			posts: this.posts,
			creationDate: this.creationDate,
		};
	}
}

import { ObjectId } from "mongodb";

export class PostEntity {
	#_id;
	#text;
	#author_id;
	#creationDate;

	get _id() {
		return this.#_id;
	}
	get text() {
		return this.#text;
	}
	get author_id() {
		return this.#author_id;
	}
	get creationDate() {
		return this.#creationDate;
	}

	constructor({ _id, text, author_id, creationDate }) {
		this.#_id = new ObjectId(_id);
		this.#text = text;
		this.#author_id = new ObjectId(author_id);
		this.#creationDate = creationDate ? new Date(creationDate) : new Date();

		Object.freeze(this.#creationDate);
	}

	toLiteral() {
		return {
			_id: this._id,
			text: this.text,
			author_id: this.author_id,
			creationDate: this.creationDate,
		};
	}
}

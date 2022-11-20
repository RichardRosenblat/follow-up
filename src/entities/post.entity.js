import { getId } from "../infra/idManager.js";

export class PostEntity {
    #_id;
    #text;
    #author_id;
    #creationDate;

    get id() {
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
        this.#_id = getId(_id);
        this.#text = text;
        this.#author_id = getId(author_id);
        this.#creationDate = creationDate ? new Date(creationDate) : new Date();

        Object.freeze(this.#creationDate);
    }

    toLiteral() {
        return {
            _id: this.id.toHexString(),
            text: this.text,
            author_id: this.author_id.toHexString(),
            creationDate: this.creationDate.toISOString().slice(0, 10),
        };
    }
}

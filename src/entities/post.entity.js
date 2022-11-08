import { UuidManager } from "../infra/uuidManager.js";

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
        this.#_id = UuidManager.getUuid(_id);
        this.#text = text;
        this.#author_id = UuidManager.getUuid(author_id);
        this.#creationDate = creationDate ? new Date(creationDate) : new Date();

        Object.freeze(this.#creationDate);
    }

    toMongoDbDocument() {
        return {
            _id: this.id,
            text: this.text,
            author_id: this.author_id,
            creationDate: this.creationDate,
        };
    }

    toLiteral() {
        return {
            ...this.toMongoDbDocument(),
            _id: this.id.toHexString(),
            author_id: this.author_id.toHexString(),
            creationDate: this.creationDate.toISOString().slice(0, 10),
        };
    }
}

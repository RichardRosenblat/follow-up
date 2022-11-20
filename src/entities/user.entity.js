import { getId } from "../infra/idManager.js";

export class UserEntity {
    #_id;
    #name;
    #email;
    #password;
    #creationDate;
    #posts;

    get id() {
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
        this.#_id = getId(_id);
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#posts = posts ? posts.map((post) => getId(post)) : [];
        this.#creationDate = creationDate ? new Date(creationDate) : new Date();

        Object.freeze(this.#posts);
        Object.freeze(this.#creationDate);
    }

    toLiteral() {
        return {
            _id: this.id.toHexString(),
            name: this.name,
            email: this.email,
            password: this.password,
            posts: this.posts.map((postId) => postId.toHexString()),
            creationDate: this.creationDate.toISOString().slice(0, 10),
        };
    }
}

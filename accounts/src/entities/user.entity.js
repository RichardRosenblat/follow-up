import { getId } from "../infra/idManager.js";

export class UserEntity {
    #_id;
    #name;
    #email;
    #password;
    #creationDate;

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

    constructor({ _id, name, email, password, creationDate }) {
        this.#_id = getId(_id);
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#creationDate = creationDate ? new Date(creationDate) : new Date();
        Object.freeze(this.#creationDate);
    }
}

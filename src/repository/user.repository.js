import { UserEntity } from "../entities/user.entity.js";

export class UserRepository {
    #db;

    constructor(database) {
        this.#db = database;
    }

    async save(user) {
        const db = await this.#db;
        await db.insertOne(user.toLiteral());
        return user;
    }

    async list() {
        const usersArray = await this.#db.find().toArray();
        return usersArray.map((user) => new UserEntity(user));
    }

    async doesEmailAlreadyExist(email) {
        const userWithEmail = await this.#db.findOne({ email });
        return userWithEmail;
    }
}

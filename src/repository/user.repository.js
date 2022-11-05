import { ObjectId } from "mongodb";
import { UserEntity } from "../entities/user.entity.js";

export class UserRepository {
    #db;

    constructor(usersDatabase) {
        this.#db = usersDatabase;
    }

    async list(params) {
        const usersArray = await this.#db.find(params).toArray();
        return usersArray.map((user) => new UserEntity(user));
    }

    async findFirst(params) {
        const userFound = await this.#db.findOne(params);
        return userFound ? new UserEntity(await this.#db.findOne(params)) : userFound;
    }

    async save(userObject) {
        await this.#db.insertOne(userObject.toLiteral());
        return await this.findFirst({ _id: userObject._id });
    }

    async updateOne(userId, alterations) {
        await this.#db.updateOne({ _id: new ObjectId(userId) }, { $set: alterations });
        return await this.findFirst({ _id: new ObjectId(userId) });
    }

    async deleteOne(userId) {
        return (await this.#db.deleteOne({ _id: new ObjectId(userId) })).deletedCount;
    }

    async addPost(userId, postId) {
        await this.#db.updateOne({ _id: new ObjectId(userId) }, { $push: { posts: postId } });
        return await this.findFirst({ _id: new ObjectId(userId) });
    }
	
    async doesEmailAlreadyExist(email) {
        const userWithEmail = await this.#db.findOne({ email });
        return userWithEmail;
    }
}

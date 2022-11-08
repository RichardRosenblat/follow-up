
import { UserEntity } from "../entities/user.entity.js";
import { UuidManager } from "../infra/uuidManager.js";

export class UserRepository {
    #userCollection;

    constructor(usersDatabase) {
        this.#userCollection = usersDatabase;
    }

    async list(params) {
        const usersArray = await this.#userCollection.find(params).toArray();
        return usersArray.map((user) => new UserEntity(user));
    }

    async findFirst(params) {
        const userFound = await this.#userCollection.findOne(params);
        return userFound ? new UserEntity(userFound) : userFound;
    }

    async save(userObject) {
        await this.#userCollection.insertOne(userObject.toMongoDbDocument());
        return await this.findFirst({ _id: userObject.id });
    }

    async updateOne(userId, alterations) {
        await this.#userCollection.updateOne({ _id: UuidManager.getUuid(userId) }, { $set: alterations });
        return await this.findFirst({ _id: UuidManager.getUuid(userId) });
    }

    async deleteOne(userId) {
        return (await this.#userCollection.deleteOne({ _id: UuidManager.getUuid(userId) })).deletedCount;
    }

    async addPost(userId, postId) {
        await this.#userCollection.updateOne(
            { _id: UuidManager.getUuid(userId) },
            { $push: { posts: postId } }
        );
        return await this.findFirst({ _id: UuidManager.getUuid(userId) });
    }

    async doesEmailAlreadyExist(email) {
        const userWithEmail = await this.#userCollection.findOne({ email });
        return Boolean(userWithEmail);
    }

    async exists(userId) {
        const userWithEmail = await this.#userCollection.findOne({ _id: UuidManager.getUuid(userId) });
        return Boolean(userWithEmail);
    }
}

import { UserEntity } from "../entities/user.entity.js";
import { getId } from "../infra/idManager.js";

export class UserRepository {
    #userCollection;

    constructor(userCollection) {
        this.#userCollection = userCollection;
    }

    async listAll() {
        const usersArray = await this.#userCollection.find().toArray();
        return usersArray.map((user) => new UserEntity(user));
    }

    async findById(userId) {
        const userFound = await this.#userCollection.findOne({ _id: getId(userId) });
        return userFound ? new UserEntity(userFound) : userFound;
    }

    async save(userEntity) {
        await this.#userCollection.insertOne(this.#userEntityToMongoDbDocument(userEntity));
        return await this.findById(userEntity.id);
    }

    async updateOne(userId, alterations) {
        await this.#userCollection.updateOne({ _id: getId(userId) }, { $set: alterations });
        return await this.findById(getId(userId));
    }

    async deleteOne(userId) {
        return (await this.#userCollection.deleteOne({ _id: getId(userId) })).deletedCount;
    }

    async addPost(userId, postId) {
        await this.#userCollection.updateOne(
            { _id: getId(userId) },
            { $push: { posts: getId(postId) } }
        );
        return await this.findById(getId(userId));
    }
    async removePost(userId, postId) {
        await this.#userCollection.updateOne(
            { _id: getId(userId) },
            { $pull: { posts: getId(postId) } }
        );
        return await this.findById(getId(userId));
    }

    async doesEmailAlreadyExist(email) {
        const userWithEmail = await this.#userCollection.findOne({ email });
        return Boolean(userWithEmail);
    }

    async exists(userId) {
        const userWithEmail = await this.#userCollection.findOne({ _id: getId(userId) });
        return Boolean(userWithEmail);
    }

    #userEntityToMongoDbDocument(userObj) {
        return {
            _id: userObj.id,
            name: userObj.name,
            email: userObj.email,
            password: userObj.password,
            posts: userObj.posts,
            creationDate: userObj.creationDate,
        };
    }
}

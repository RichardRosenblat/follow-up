import { PostEntity } from "../entities/post.entity.js";

export class PostsRepository {
    #db;
    #userRepository;

    constructor(postsDatabase, userRepository) {
        this.#db = postsDatabase;
        this.#userRepository = userRepository;
    }

    async list(params) {
        const postsArray = await this.#db.find(params).toArray();
        return postsArray.map((user) => new PostEntity(user));
    }

    async findFirst(params) {
        const postFound = await this.#db.findOne(params);
        return postFound ? new PostEntity(postFound) : postFound;
    }

    async save(postObject) {
        await this.#userRepository.addPost(postObject.author_id, postObject._id);
        await this.#db.insertOne(postObject.toLiteral());
        return await this.findFirst({ _id: postObject._id });
    }

    async updateOne(postId, alterations) {
        await this.#db.updateOne({ _id: postId }, { $set: alterations });
        return await this.findFirst({ _id: postId });
    }

    async deleteOne(postId) {
        return (await this.#db.deleteOne({ _id: postId })).deletedCount;
    }
}

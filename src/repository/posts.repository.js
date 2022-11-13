import { PostEntity } from "../entities/post.entity.js";

export class PostsRepository {
    #postCollection;
    #userRepository;

    constructor(postsCollection, userRepository) {
        this.#postCollection = postsCollection;
        this.#userRepository = userRepository;
    }

    async listAll() {
        const postsArray = await this.#postCollection.find().toArray();
        return postsArray.map((user) => new PostEntity(user));
    }

    async findFirst(params) {
        const postFound = await this.#postCollection.findOne(params);
        return postFound ? new PostEntity(postFound) : postFound;
    }

    async save(postObject) {
        await this.#userRepository.addPost(postObject.author_id, postObject.id);
        await this.#postCollection.insertOne(postObject.toMongoDbDocument());
        return await this.findFirst({ _id: postObject.id });
    }

    async updateOne(postId, alterations) {
        await this.#postCollection.updateOne({ _id: postId }, { $set: alterations });
        return await this.findFirst({ _id: postId });
    }

    async deleteOne(postId) {
        return (await this.#postCollection.deleteOne({ _id: postId })).deletedCount;
    }

    async doesUserExists(userId) {
        return await this.#userRepository.exists(userId);
    }
}

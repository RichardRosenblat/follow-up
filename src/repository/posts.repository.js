import { PostEntity } from "../entities/post.entity.js";
import { getId } from "../infra/idManager.js";

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

    async findById(postId) {
        const postFound = await this.#postCollection.findOne({ _id: getId(postId) });
        return postFound ? new PostEntity(postFound) : postFound;
    }

    async save(postEntity) {
        await this.#userRepository.addPost(postEntity.author_id, postEntity.id);
        await this.#postCollection.insertOne(this.#postEntityToMongoDbDocument(postEntity));
        return await this.findById(postEntity.id);
    }

    async updateOne(postId, alterations) {
        await this.#postCollection.updateOne({ _id: postId }, { $set: alterations });
        return await this.findById(postId);
    }

    async deleteOne(postId) {
        const postObj = await this.findById(postId);
        await this.#userRepository.removePost(postObj.author_id, postId);
        return (await this.#postCollection.deleteOne({ _id: postId })).deletedCount;
    }

    async doesUserExists(userId) {
        return await this.#userRepository.exists(userId);
    }

    #postEntityToMongoDbDocument(postObj) {
        return {
            _id: postObj.id,
            text: postObj.text,
            author_id: postObj.author_id,
            creationDate: postObj.creationDate,
        };
    }
}

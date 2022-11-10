import { DatabaseConnections } from "../../src/infra/database-connections.js";
import { PostsRepository } from "../../src/repository/posts.repository.js";
import { UserRepository } from "../../src/repository/user.repository.js";
import { CreatePostUseCase } from "../../src/use-cases/create-post.js";
import { CreateUserUseCase } from "../../src/use-cases/create-user.js";

export class ClassesFactory {
    static #connectionData = {
        connectionString: "mongodb://localhost:27017",
        databaseName: "follow-up",
    };

    static #userCollection;
    static #userRepository;
    static #userCreate;

    static #postCollection;
    static #postRepository;
    static #postCreate;

    static get connectionData() {
        return this.#connectionData;
    }

    static async getUserClasses() {
        if (!(this.#userCollection || this.#userRepository || this.#userCreate)) {
            this.#userCollection = await DatabaseConnections.connect({
                ...this.#connectionData,
                collection: "test_users",
            });
            this.#userRepository = new UserRepository(this.#userCollection);
            this.#userCreate = new CreateUserUseCase(this.#userRepository);
        }

        return {
            userCollection: this.#userCollection,
            userRepository: this.#userRepository,
            userCreate: this.#userCreate,
        };
    }
    static async getPostClasses() {
        const { userRepository } = await this.getUserClasses();
        if (!(this.#postCollection || this.#postRepository || this.#postCreate)) {
            this.#postCollection = await DatabaseConnections.connect({
                ...this.#connectionData,
                collection: "test_posts",
            });

            this.#postRepository = new PostsRepository(this.#postCollection, userRepository);
            this.#postCreate = new CreatePostUseCase(this.#postRepository);
        }
        return {
            postCollection: this.#postCollection,
            postRepository: this.#postRepository,
            postCreate: this.#postCreate,
        };
    }
    static async cleanUpTestDatabases() {
        await this.#userCollection.deleteMany({});
        if (this.#postCollection) {
            await this.#postCollection.deleteMany({});
        }

        DatabaseConnections.disconnect();
    }
}

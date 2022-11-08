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

    static #userDb;
    static #userRepository;
    static #userCreate;

    static #postDb;
    static #postRepository;
    static #postCreate;

    static get connectionData() {
        return this.#connectionData;
    }

    static async getUserClasses() {
        if (!(this.#userDb || this.#userRepository || this.#userCreate)) {
            this.#userDb = await DatabaseConnections.connect({
                ...this.#connectionData,
                collection: "test_users",
            });
            this.#userRepository = new UserRepository(this.#userDb);
            this.#userCreate = new CreateUserUseCase(this.#userRepository);
        }

        return {
            userDb: this.#userDb,
            userRepository: this.#userRepository,
            userCreate: this.#userCreate,
        };
    }
    static async getPostClasses() {
        const { userRepository } = await this.getUserClasses();
        if (!(this.#postDb || this.#postRepository || this.#postCreate)) {
            this.#postDb = await DatabaseConnections.connect({
                ...this.#connectionData,
                collection: "test_posts",
            });

            this.#postRepository = new PostsRepository(this.#postDb, userRepository);
            this.#postCreate = new CreatePostUseCase(this.#postRepository);
        }
        return {
            postDb: this.#postDb,
            postRepository: this.#postRepository,
            postCreate: this.#postCreate,
        };
    }
    static async cleanUpTestDatabases() {
        await this.#userDb.deleteMany({});
        if (this.#postDb) {
            await this.#postDb.deleteMany({});
        }

        DatabaseConnections.disconnect();
    }
}

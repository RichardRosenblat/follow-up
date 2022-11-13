import express from "express";
import { DatabaseConnections } from "../../infra/database-connections.js";
import { UserRepository } from "../../repository/user.repository.js";
import { CreateUserUseCase } from "../../use-cases/user/create-user.js";
import { DeleteUserUseCase } from "../../use-cases/user/delete-user.js";
import { FindByIdUserUseCase } from "../../use-cases/user/find-by-id-user.js";
import { ListAllUserUseCase } from "../../use-cases/user/list-all-user.js";
import { UpdateUserUseCase } from "../../use-cases/user/update-user.js";
import { CreateUserRequest } from "../requests/user/create-user.request.js";
import { DeleteUserRequest } from "../requests/user/delete-user.request.js";
import { FindByIdUserRequest } from "../requests/user/find-by-id-user.request.js";
import { ListAllUserRequest } from "../requests/user/list-all-user.request.js";
import { UpdateUserRequest } from "../requests/user/update-user.request.js";

export class UserController {
    static #usersCollection;
    static #userRepository;

    static async instanceUserResources(databaseConnectionData) {
        this.#usersCollection = await DatabaseConnections.connect({
            ...databaseConnectionData,
            collection: "users",
        });
        this.#userRepository = new UserRepository(this.#usersCollection);
    }

    static async getRoutes(databaseConnectionData) {
        await UserController.instanceUserResources(databaseConnectionData);
        const router = express.Router();

        UserController.setListAllRoute(router);
        UserController.setFindByIdRoute(router);
        UserController.setCreateUserRoute(router);
        UserController.setUpdateRoute(router);
        UserController.setDeleteRoute(router);

        return router;
    }

    static setListAllRoute(router) {
        const listAllUser = new ListAllUserUseCase(this.#userRepository);
        const listRequest = new ListAllUserRequest(listAllUser);
        router.get("/users", listRequest.execute.bind(listRequest));
    }

    static setFindByIdRoute(router) {
        const findByIdUser = new FindByIdUserUseCase(this.#userRepository);
        const findByIdRequest = new FindByIdUserRequest(findByIdUser);
        router.get("/users/:id", findByIdRequest.execute.bind(findByIdRequest));
    }

    static setCreateUserRoute(router) {
        const createUser = new CreateUserUseCase(this.#userRepository);
        const createRequest = new CreateUserRequest(createUser);
        router.post("/users", createRequest.execute.bind(createRequest));
    }

    static setUpdateRoute(router) {
        const updateUser = new UpdateUserUseCase(this.#userRepository);
        const updateRequest = new UpdateUserRequest(updateUser);
        router.put("/users/:id", updateRequest.execute.bind(updateRequest));
    }

    static setDeleteRoute(router) {
        const deleteUser = new DeleteUserUseCase(this.#userRepository);
        const deleteRequest = new DeleteUserRequest(deleteUser);
        router.delete("/users/:id", deleteRequest.execute.bind(deleteRequest));
    }
}

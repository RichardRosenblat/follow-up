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

let usersCollection;
let userRepository;

export async function getRoutes(databaseConnectionData) {
    await instanceUserResources(databaseConnectionData);
    const router = express.Router();

    setListAllRoute(router);
    setFindByIdRoute(router);
    setCreateUserRoute(router);
    setUpdateRoute(router);
    setDeleteRoute(router);

    return router;
}

async function instanceUserResources(databaseConnectionData) {
    usersCollection = await DatabaseConnections.connect({
        ...databaseConnectionData,
        collection: "users",
    });
    userRepository = new UserRepository(usersCollection);
}

function setListAllRoute(router) {
    const listAllUser = new ListAllUserUseCase(userRepository);
    const listRequest = new ListAllUserRequest(listAllUser);
    router.get("/users", (req, res) => listRequest.execute(req, res));
}
function setFindByIdRoute(router) {
    const findByIdUser = new FindByIdUserUseCase(userRepository);
    const findByIdRequest = new FindByIdUserRequest(findByIdUser);
    router.get("/users/:id", (req, res) => findByIdRequest.execute(req, res));
}
function setCreateUserRoute(router) {
    const createUser = new CreateUserUseCase(userRepository);
    const createRequest = new CreateUserRequest(createUser);
    router.post("/users", (req, res) => createRequest.execute(req, res));
}
function setUpdateRoute(router) {
    const updateUser = new UpdateUserUseCase(userRepository);
    const updateRequest = new UpdateUserRequest(updateUser);
    router.put("/users/:id", (req, res) => updateRequest.execute(req, res));
}
function setDeleteRoute(router) {
    const deleteUser = new DeleteUserUseCase(userRepository);
    const deleteRequest = new DeleteUserRequest(deleteUser);
    router.delete("/users/:id", (req, res) => deleteRequest.execute(req, res));
}

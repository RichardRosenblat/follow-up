import express from "express";
import { DatabaseConnections } from "../../infra/database-connections.js";
import { UserRepository } from "../../repository/user.repository.js";
import { CreateUserUseCase } from "../../use-cases/create-user.js";
import { CreateUserRequest } from "../requests/create-user.request.js";

export class UserController {
	static async getRoutes(databaseConnectionData) {
		const { createRequest } = await UserController.instanceUserResources(databaseConnectionData);

		const router = express.Router();
		router.post("/users", createRequest.execute.bind(createRequest));
		return router;
	}

	static async instanceUserResources(databaseConnectionData) {
		const usersCollection = await DatabaseConnections.connect({ ...databaseConnectionData, collection: "users" });
		const userRepository = new UserRepository(usersCollection);
		const createUser = new CreateUserUseCase(userRepository);
		const createRequest = new CreateUserRequest(createUser);

		return { createRequest };
	}
}

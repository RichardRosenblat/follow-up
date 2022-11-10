import express from "express";
import { DatabaseConnections } from "../infra/database-connections.js";
import { UserController } from "./routes/userRoutes.js";

export class ServerRouter {
	static async setAllRoutes(app, databaseConnectionData) {
		app.route("/").get((_req, res) => {
			const dbHealth = DatabaseConnections.status;
			res.status(200).send({ Server: "ok", Database: dbHealth  });
		});
		const userRoutes = await UserController.getRoutes(databaseConnectionData);
		app.use(express.json(), userRoutes);
	}
}

import express from "express";
import { DatabaseConnections } from "../infra/database-connections.js";
import { ServerRouter } from "./router.js";

export class Server {
	static #application;
	static async start(port, databaseConnectionData) {
		const app = express();

		await ServerRouter.setAllRoutes(app, databaseConnectionData);
		this.#application = app.listen(port, () => {
			console.log(`Follow-up server started successfully in http://localhost:${port}`);
		});
	}

	static async shutdown() {
		this.#application.close();
		DatabaseConnections.disconnect();
	}
}

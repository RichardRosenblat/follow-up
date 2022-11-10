import express from "express";
import { DatabaseConnections } from "../infra/database-connections.js";
import { ServerRouter } from "./router.js";

export class Server {
	static #application;
	static async start(port, databaseConnectionData) {
		this.#application = express();

		await ServerRouter.setAllRoutes(this.#application, databaseConnectionData);

		this.#application.listen(port, () => {
			console.log(`Follow-up server started successfully in http://localhost:${port}`);
		});
	}

	static async shutdown() {
		DatabaseConnections.disconnect();
		this.#application.close();
	}
}

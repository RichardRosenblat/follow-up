import express from "express";
import { DatabaseConnections } from "../infra/database-connections.js";
import { setAllRoutes } from "./router.js";

let application = null;

export async function start(port, databaseConnectionData) {
	const app = express();

	await setAllRoutes(app, databaseConnectionData);
	application = app.listen(port, () => {
		console.log(`Follow-up server started successfully in http://localhost:${port}`);
	});

	return application;
}

export async function shutdown() {
	console.log("Shutting down Follow-up server");
	if (application) {
		application.close();
		application = null;
	}
	DatabaseConnections.disconnect();
}

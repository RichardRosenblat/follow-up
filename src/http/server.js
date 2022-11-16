import express from "express";
import { DatabaseConnections } from "../infra/database-connections.js";
import { ServerRouter } from "./router.js";

let application = null;

export async function start(port, databaseConnectionData) {
    const app = express();

    await ServerRouter.setAllRoutes(app, databaseConnectionData);
    application = app.listen(port, () => {
        console.log(`Follow-up server started successfully in http://localhost:${port}`);
    });
}

export async function shutdown() {
	console.log('Shutting down Follow-up server');
    if (application) {
        application.close();
    }
    DatabaseConnections.disconnect();
}

import express from "express";
import { DatabaseConnections } from "../infra/database-connections.js";
import { getRoutes } from "./controllers/user.controller.js";

export async function setAllRoutes(app, databaseConnectionData) {
    app.use(express.json());
    app.route("/").get((_req, res) => {
        const dbHealth = DatabaseConnections.status;
        res.status(200).json({ Server: "ok", Database: dbHealth });
    });
    const userController = await getRoutes(databaseConnectionData);
    app.use(userController);
}

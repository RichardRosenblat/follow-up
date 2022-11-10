import dotenv from "dotenv";
import { Server } from "./http/server.js";

dotenv.config();

const port = process.env.PORT || 3000;
const connectionString = process.env.CONNECTIONSTRING || "mongodb://localhost:27017";
const databaseName = process.env.DATABASENAME || "follow-up";

Server.start(port, { connectionString, databaseName });
process.on("exit", Server.shutdown);

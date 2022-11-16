import dotenv from "dotenv";
import { shutdown, start } from "./http/server.js";

dotenv.config();

const port = process.env.PORT || 3000;
const connectionString = process.env.CONNECTIONSTRING || "mongodb://localhost:27017";
const databaseName = process.env.DATABASENAME || "follow-up";

start(port, { connectionString, databaseName });
process.on("SIGINT", shutdown);

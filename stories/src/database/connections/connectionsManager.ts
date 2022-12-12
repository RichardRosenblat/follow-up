import { Sequelize } from "sequelize";
import config from "../config/config";

const { database, username, password, ...options } = config;

console.log();
console.log("Connecting to database");
const connection = new Sequelize(database, username, password, options);
console.log("Database connected");
console.log();

export { connection };

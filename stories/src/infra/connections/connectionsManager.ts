import { Sequelize } from "sequelize";
import config from "../config/config";

const { database, username, password, ...options } = config;

const connection = new Sequelize(database, username, password, {
    ...options,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
console.log("Database connected");

export { connection };

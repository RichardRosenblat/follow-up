import * as dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();

export default {
    username: process.env.PG_USERNAME || "postgres",
    password: process.env.PG_PASSWORD || "postgres",
    database: "follow_up",
    host: process.env.PG_HOST || "127.0.0.1",
    port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
    dialect: <Dialect>"postgres",
};

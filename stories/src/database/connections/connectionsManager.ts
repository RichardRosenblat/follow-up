import { Sequelize } from "sequelize";
import config from "../config/config";

const { database, username, password, ...options } = config;
export const connection = new Sequelize(database, username, password, options);

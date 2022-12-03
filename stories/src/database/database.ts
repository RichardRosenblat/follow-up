import { Sequelize } from "sequelize";
import { IDatabase } from "../types/database.type";
import { connection } from "./connections/connectionsManager";
import { Story } from "./models/story.model";

const database: IDatabase = {
    connection,
    Sequelize: Sequelize,
    tables: { Story },
};
export default database;

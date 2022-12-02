import { Sequelize } from "sequelize";
import { IDatabase } from "../types/db.type";
import { connection } from "./connections/connectionsManager";
import { Story } from "./models/story.model";

const db: IDatabase = {
    connection,
    Sequelize: Sequelize,
    Story,
};
export default db;

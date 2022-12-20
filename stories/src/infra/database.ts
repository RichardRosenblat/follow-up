import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize";
import { IDatabase } from "./types/database.type";
import { connection } from "./connections/connectionsManager";
import { Story } from "./models/story.model";

@Injectable()
export class Database implements IDatabase {
    connection = connection;
    Sequelize = Sequelize;
    tables = { Story };

    async onApplicationShutdown(): Promise<void> {
        console.log("Disconnecting database");
        await this.connection.close();
        console.log("Database disconnected");
    }
}

import { OnApplicationShutdown } from "@nestjs/common/interfaces";
import { Model, ModelStatic, Sequelize } from "sequelize";

export interface IDatabase extends OnApplicationShutdown {
    connection: Sequelize;
    Sequelize: typeof Sequelize;
    tables: { [key: string]: ModelStatic<Model<any, any>> };
}

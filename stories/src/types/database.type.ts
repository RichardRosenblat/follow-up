import { Model, ModelStatic, Sequelize } from "sequelize";

export interface IDatabase {
    connection: Sequelize;
    Sequelize: typeof Sequelize;
    tables: { [key: string]: ModelStatic<Model<any, any>> };
}

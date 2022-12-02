import { Model, ModelStatic, Sequelize } from "sequelize";

export interface IDatabase {
    connection: Sequelize;
    Sequelize: typeof Sequelize;
    Story: ModelStatic<Model<any, any>>;
}
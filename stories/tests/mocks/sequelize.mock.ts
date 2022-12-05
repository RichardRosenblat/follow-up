import { IDatabase } from "../../src/types/database.type";
import { storyModelMock } from "./story.model.mock";

export const sequelizeMock: IDatabase = {
    Sequelize: <any>{},
    connection: <any>{},
    tables: {
        Story: <any>storyModelMock,
    },
};

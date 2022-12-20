import { OnApplicationShutdown } from "@nestjs/common";
import { IDatabase } from "../../src/infra/types/database.type";
import { storyModelMock } from "./story.model.mock";

export const sequelizeMock: IDatabase & OnApplicationShutdown = {
    Sequelize: <any>{},
    connection: <any>{},
    tables: {
        Story: <any>storyModelMock,
    },
    onApplicationShutdown(){
        console.log("mock has been shutdown"); 
    }
};

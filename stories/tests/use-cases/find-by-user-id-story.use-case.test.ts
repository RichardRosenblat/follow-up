import { expect } from "@jest/globals";
import ObjectId from "bson-objectid";
import { StoryRepository } from "../../src/repositories/story.repository";
import { FindByUserIdStoryUseCase } from "../../src/use-cases/find-by-user-id-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { restartStoriesTable, storiesTable } from "../mocks/stories-table.mock";

describe("Find by user id story use case", () => {
    restartStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new FindByUserIdStoryUseCase(repository);

    it("Should return an array of stories by calling the method execute", async () => {
        const foundByUserId = await useCase.execute(storiesTable[0].dataValues.userId);
        expect(foundByUserId.length).not.toBe(0);
        expect(foundByUserId[0]).toStrictEqual(storiesTable[0].dataValues);
    });
    it("Should return an array of stories by calling the method execute with an id without stories", async () => {
        const foundByUserId = await useCase.execute(ObjectId().toHexString());
        expect(foundByUserId).toStrictEqual([]);
    });
});

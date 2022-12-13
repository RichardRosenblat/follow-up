import { expect } from "@jest/globals";
import { StoryRepository } from "../../src/domain/story/repositories/story.repository";
import { FindByUserIdStoryUseCase } from "../../src/domain/story/use-cases/find-by-user-id-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable, storiesTable } from "../mocks/stories-table.mock";

describe("Find by user id story use case", () => {
    resetStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new FindByUserIdStoryUseCase(repository);

    it("Should return an array of stories", async () => {
        const foundByUserId = await useCase.execute(storiesTable[0].dataValues.userId);
        expect(foundByUserId.length).not.toBe(0);
        expect(foundByUserId[0]).toStrictEqual(storiesTable[0].dataValues);
    });
    it("Should return an array of stories when given an id without stories", async () => {
        const foundByUserId = await useCase.execute('638f8459fe24d2f39c86cb29');
        expect(foundByUserId).toStrictEqual([]);
    });
});

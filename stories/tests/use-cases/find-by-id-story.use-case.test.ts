import { expect } from "@jest/globals";
import { v4 } from "uuid";
import { StoryRepository } from "../../src/repositories/story.repository";
import { FindByIdStoryUseCase } from "../../src/use-cases/find-by-id-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { restartStoriesTable, storiesTable } from "../mocks/stories-table.mock";

describe("Find by id story use case", () => {
    restartStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new FindByIdStoryUseCase(repository);

    it("Should return an story by id when execute is called", async () => {
        const foundbyId = await useCase.execute(storiesTable[0].dataValues.id);
        expect(foundbyId).toStrictEqual(storiesTable[0].dataValues);
    });
    it("Should return an falsy value when execute is called with an inexistent id", async () => {
        const notFoundbyId = await useCase.execute(v4());
        expect(notFoundbyId).not.toBeTruthy();
    });
});

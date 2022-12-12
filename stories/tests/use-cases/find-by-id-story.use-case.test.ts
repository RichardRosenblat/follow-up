import { expect } from "@jest/globals";
import { v4 } from "uuid";
import { StoryRepository } from "../../src/repositories/story.repository";
import { FindByIdStoryUseCase } from "../../src/use-cases/find-by-id-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable, storiesTable } from "../mocks/stories-table.mock";

describe("Find by id story use case", () => {
    resetStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new FindByIdStoryUseCase(repository);

    it("Should return an story by id", async () => {
        const foundbyId = await useCase.execute(storiesTable[0].dataValues.id);
        expect(foundbyId).toStrictEqual(storiesTable[0].dataValues);
    });
    it("Should throw an error when given an inexistent id", async () => {
        expect(() => useCase.execute(v4())).rejects.toThrow();
    });
});

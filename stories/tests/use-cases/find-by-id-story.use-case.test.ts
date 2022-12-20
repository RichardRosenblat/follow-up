import { expect } from "@jest/globals";
import { v4 } from "uuid";
import { StoryRepository } from "../../src/domain/story/repositories/story.repository";
import { FindByIdStoryUseCase } from "../../src/domain/story/use-cases/find-by-id-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable, storiesTable } from "../mocks/stories-table.mock";
import { StoryDTO } from "../../src/domain/story/dtos/story.dto";

describe("Find by id story use case", () => {
    resetStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new FindByIdStoryUseCase(repository);

    it("Should return an story by id", async () => {
        const foundbyId = await useCase.execute(storiesTable[0].dataValues.id);
        expect(foundbyId).toStrictEqual(new StoryDTO(storiesTable[0].dataValues));
    });
    it("Should throw an error when given an inexistent id", async () => {
        expect(() => useCase.execute(v4())).rejects.toThrow();
    });
});

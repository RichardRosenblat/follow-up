import { expect } from "@jest/globals";
import { v4 } from "uuid";
import { StoryRepository } from "../../src/repositories/story.repository";
import { DeleteStoryUseCase } from "../../src/use-cases/delete-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable, storiesTable } from "../mocks/stories-table.mock";

describe("Delete story use case", () => {
    resetStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new DeleteStoryUseCase(repository);

    it("Should remove a story", async () => {
        const idToDelete = storiesTable[0].dataValues.id;
        await useCase.execute(storiesTable[0].dataValues.id);
        const notFoundbyId = await repository.findById(idToDelete);
        expect(notFoundbyId).not.toBeTruthy();
        
    });
    it("Should throw an error when given an inexistent id", async () => {
        expect(() => useCase.execute(v4())).rejects.toThrow();
    });
});

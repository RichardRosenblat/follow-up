import { expect } from "@jest/globals";
import { StoryRepository } from "../../src/repositories/story.repository";
import { DeleteStoryUseCase } from "../../src/use-cases/delete-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { restartStoriesTable, storiesTable } from "../mocks/stories-table.mock";

describe("Delete story use case", () => {
    restartStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new DeleteStoryUseCase(repository);

    it("Should remove a story by calling the method execute", async () => {
        const idToDelete = storiesTable[0].dataValues.id;
        await useCase.execute(storiesTable[0].dataValues.id);
        const notFoundbyId = await repository.findById(idToDelete);
        expect(notFoundbyId).not.toBeTruthy();
    });
});

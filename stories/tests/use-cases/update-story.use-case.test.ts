import { expect } from "@jest/globals";
import { StoryRepository } from "../../src/repositories/story.repository";
import { UpdateStoryUseCase } from "../../src/use-cases/update-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { restartStoriesTable, storiesTable } from "../mocks/stories-table.mock";

describe("Update story use case", () => {
    restartStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new UpdateStoryUseCase(repository);

    it("Should update a story by calling the method execute", async () => {
        const originalStory = { ...storiesTable[0].dataValues };
        const editedStory = await useCase.execute(storiesTable[0].dataValues.id, {
            title: "edited Title",
            content: "edited content",
        });

        expect(editedStory).toEqual({
            ...originalStory,
            title: "edited Title",
            content: "edited content",
            updatedAt: expect.any(Date),
        });
    });
});

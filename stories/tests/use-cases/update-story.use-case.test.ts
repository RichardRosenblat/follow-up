import { expect } from "@jest/globals";
import { v4 } from "uuid";
import { StoryRepository } from "../../src/domain/story/repositories/story.repository";
import { UpdateStoryUseCase } from "../../src/domain/story/use-cases/update-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable, storiesTable } from "../mocks/stories-table.mock";
import { UpdateStoryDTO } from "../../src/domain/story/dtos/updateStory.dto";

describe("Update story use case", () => {
    resetStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new UpdateStoryUseCase(repository);

    it("Should update a story by calling the method execute", async () => {
        const originalStory = { ...storiesTable[0].dataValues };
        const dto = new UpdateStoryDTO();
        dto.title = "edited Title";
        dto.content = "edited content";

        const editedStory = await useCase.execute(storiesTable[0].dataValues.id, dto);

        expect(editedStory).toEqual({
            ...originalStory,
            title: "edited Title",
            content: "edited content",
            updatedAt: expect.any(Date),
        });
    });
    it("Should throw an error when given an inexistent id", async () => {
        expect(() => useCase.execute(v4(), new UpdateStoryDTO())).rejects.toThrow();
    });
});

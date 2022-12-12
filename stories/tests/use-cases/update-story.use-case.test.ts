import { expect } from "@jest/globals";
import { v4 } from "uuid";
import { UpdateStoryDTO } from "../../src/dtos/updateStory.dto";
import { StoryRepository } from "../../src/repositories/story.repository";
import { UpdateStoryUseCase } from "../../src/use-cases/update-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable, storiesTable } from "../mocks/stories-table.mock";

describe("Update story use case", () => {
    resetStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new UpdateStoryUseCase(repository);

    it("Should update a story by calling the method execute", async () => {
        const originalStory = { ...storiesTable[0].dataValues };
        const editedStory = await useCase.execute(
            storiesTable[0].dataValues.id,
            new UpdateStoryDTO(undefined, "edited Title", "edited content")
        );

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
    it("Should throw an error when given an empty userId value", async () => {
        expect(() =>
            useCase.execute(storiesTable[0].dataValues.id, new UpdateStoryDTO(""))
        ).rejects.toThrow();
    });
    it("Should throw an error when given an empty title value", async () => {
        expect(() =>
            useCase.execute(
                storiesTable[0].dataValues.id,
                new UpdateStoryDTO("638013044e7c8f1e18b9448c", "")
            )
        ).rejects.toThrow();
    });
    it("Should throw an error when given an userId value that is not a string", async () => {
        expect(() =>
            useCase.execute(storiesTable[0].dataValues.id, new UpdateStoryDTO(<any>1))
        ).rejects.toThrow();
    });
    it("Should throw an error when given a title value that is not a string", async () => {
        expect(() =>
            useCase.execute(
                storiesTable[0].dataValues.id,
                new UpdateStoryDTO("638013044e7c8f1e18b9448c", <any>1)
            )
        ).rejects.toThrow();
    });
    it("Should throw an error when given a content value that is not a string", async () => {
        expect(() =>
            useCase.execute(
                storiesTable[0].dataValues.id,
                new UpdateStoryDTO("638013044e7c8f1e18b9448c", "created", <any>1, 1)
            )
        ).rejects.toThrow();
    });
    it("Should throw an error when given an impressions value lower than zero", async () => {
        expect(() =>
            useCase.execute(
                storiesTable[0].dataValues.id,
                new UpdateStoryDTO("638013044e7c8f1e18b9448c", "created", "content", -1)
            )
        ).rejects.toThrow();
    });
    it("Should throw an error when given an impressions value that is not an integer", async () => {
        expect(() =>
            useCase.execute(
                storiesTable[0].dataValues.id,
                new UpdateStoryDTO("638013044e7c8f1e18b9448c", "created", "content", 1.5)
            )
        ).rejects.toThrow();
    });
});

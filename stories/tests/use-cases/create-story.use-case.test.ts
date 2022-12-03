import { expect } from "@jest/globals";
import { StoryRepository } from "../../src/repositories/story.repository";
import { CreateStoryUseCase } from "../../src/use-cases/create-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { restartStoriesTable } from "../mocks/stories-table.mock";

describe("Create story use case", () => {
    restartStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new CreateStoryUseCase(repository);

    it("Should create a new story by calling the method execute", async () => {
        const createdStory = await useCase.execute({
            userId: "638013044e7c8f1e18b9448c",
            title: "created",
        });
        expect(createdStory).toEqual(
            expect.objectContaining({
                title: "created",
                userId: "638013044e7c8f1e18b9448c",
                impressions: 0,
                id: expect.any(String),
                content: "",
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        );
    });
});

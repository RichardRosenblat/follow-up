import { expect } from "@jest/globals";
import { CreateStoryUseCase } from "../../src/domain/story/use-cases/create-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable } from "../mocks/stories-table.mock";
import { StoryRepository } from "../../src/domain/story/repositories/story.repository";
import { CreateStoryDTO } from "../../src/domain/story/dtos/createStory.dto";

describe("Create story use case", () => {
    resetStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new CreateStoryUseCase(repository);

    it("Should create a new story", async () => {
        const dto = new CreateStoryDTO();

        dto.userId = "638013044e7c8f1e18b9448c";
        dto.title = "created";

        const createdStory = await useCase.execute(dto);
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

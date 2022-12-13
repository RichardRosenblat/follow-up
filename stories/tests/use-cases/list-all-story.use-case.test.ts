import { expect } from "@jest/globals";
import { StoryRepository } from "../../src/domain/repositories/story.repository";
import { ListAllStoryUseCase } from "../../src/domain/story/use-cases/list-all-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable, storiesTable } from "../mocks/stories-table.mock";
import { storyModelMock } from "../mocks/story.model.mock";

describe("List all story use case", () => {
    resetStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new ListAllStoryUseCase(repository);

    it("Should return all stories", async () => {
        const allListed = await useCase.execute();
        expect(allListed).toStrictEqual(
            expect.arrayContaining(storiesTable.map((s) => s.dataValues))
        );
    });
    it("Should return an empty array when there are no stories", async () => {
        storyModelMock.findAll.mockReturnValueOnce([]);
        const noneListed = await useCase.execute();
        expect(noneListed).toStrictEqual([]);
    });
});

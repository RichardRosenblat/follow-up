import { expect } from "@jest/globals";
import { StoryRepository } from "../../src/repositories/story.repository";
import { ListAllStoryUseCase } from "../../src/use-cases/list-all-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { restartStoriesTable, storiesTable } from "../mocks/stories-table.mock";
import { storyModelMock } from "../mocks/story.model.mock";

describe("List all story use case", () => {
    restartStoriesTable();
    const repository = new StoryRepository(sequelizeMock);
    const useCase = new ListAllStoryUseCase(repository);

    it("Should return all stories when method execute is called", async () => {
        const allListed = await useCase.execute();
        expect(allListed).toStrictEqual(
            expect.arrayContaining(storiesTable.map((s) => s.dataValues))
        );
    });
    it("Should return an empty array when method execute is called and there are no stories", async () => {
        storyModelMock.findAll.mockReturnValueOnce([]);
        const noneListed = await useCase.execute();
        expect(noneListed).toStrictEqual([]);
    });
});

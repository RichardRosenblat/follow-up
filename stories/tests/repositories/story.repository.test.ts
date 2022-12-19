import { expect } from "@jest/globals";
import { CreateStoryDTO } from "../../src/domain/story/dtos/createStory.dto";
import { UpdateStoryDTO } from "../../src/domain/story/dtos/updateStory.dto";
import { StoryRepository } from "../../src/domain/story/repositories/story.repository";
import { v4 } from "uuid";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable, storiesTable } from "../mocks/stories-table.mock";
import { storyModelMock } from "../mocks/story.model.mock";

describe("Stories repository", () => {
	resetStoriesTable();
	const repository = new StoryRepository(sequelizeMock);
	describe("List All", () => {
		it("Should return all stories", async () => {
			const allListed = await repository.listAll();
			expect(allListed).toStrictEqual(expect.arrayContaining(storiesTable.map((s) => s.dataValues)));
		});
		it("Should return an empty array when there are no stories", async () => {
			storyModelMock.findAll.mockReturnValueOnce([]);
			const noneListed = await repository.listAll();
			expect(noneListed).toStrictEqual([]);
		});
	});
	describe("Find by id", () => {
		it("Should return an story by id", async () => {
			const foundbyId = await repository.findById(storiesTable[0].dataValues.id);
			expect(foundbyId).toStrictEqual(storiesTable[0].dataValues);
		});
		it("Should return an falsy value when given an inexistent id", async () => {
			const notFoundbyId = await repository.findById(v4());
			expect(notFoundbyId).not.toBeTruthy();
		});
	});
	describe("Create", () => {
		it("Should create a new story", async () => {
			const story = new CreateStoryDTO();
			story.userId = "638013044e7c8f1e18b9448c";
			story.title = "created";

			const createdStory = await repository.create(story);

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
	describe("Update", () => {
		it("Should update a story", async () => {
			const originalStory = { ...storiesTable[0].dataValues };

            const story = new UpdateStoryDTO();

            story.title = "edited Title"
            story.content = "edited content"

			const editedStory = await repository.update(
				storiesTable[0].dataValues.id,
				story
			);

			expect(editedStory).toEqual({
				...originalStory,
				title: "edited Title",
				content: "edited content",
				updatedAt: expect.any(Date),
			});
		});
	});
	describe("Delete", () => {
		it("Should remove a story", async () => {
			const idToDelete = storiesTable[0].dataValues.id;
			await repository.delete(storiesTable[0].dataValues.id);
			const notFoundbyId = await repository.findById(idToDelete);
			expect(notFoundbyId).not.toBeTruthy();
		});
	});
	describe("Find by user id", () => {
		it("Should return an array of stories", async () => {
			const foundByUserId = await repository.findByUserId(storiesTable[0].dataValues.userId);
			expect(foundByUserId.length).not.toBe(0);
			expect(foundByUserId[0]).toStrictEqual(storiesTable[0].dataValues);
		});
		it("Should return an empty array when given an id without stories", async () => {
			const foundByUserId = await repository.findByUserId("638f8459fe24d2f39c86cb29");
			expect(foundByUserId).toStrictEqual([]);
		});
	});
});

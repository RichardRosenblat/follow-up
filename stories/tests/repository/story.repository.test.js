import { StoryRepository } from "../../src/repositories/story.repository.js";
import { sequelizeMock, storiesTable } from "../mocks/sequelize.mock.js";
import { expect } from "@jest/globals";
import { v4 } from "uuid";
import ObjectId from 'bson-objectid'

describe("Stories repository", () => {
	const repository = new StoryRepository(sequelizeMock);
	it("Should return all stories when method listAll is called", async () => {
		const allListed = await repository.listAll();
		expect(allListed).toStrictEqual(expect.arrayContaining(storiesTable.map((s) => s.dataValues)));
	});
	it("Should return an empty array when method listAll is called and there are no stories", async () => {
		sequelizeMock.Story.findAll.mockReturnValueOnce([]);
		const noneListed = await repository.listAll();
		expect(noneListed).toStrictEqual([]);
	});
	it("Should return an story by id when find by id is called", async () => {
		const foundbyId = await repository.findById(storiesTable[0].dataValues.id);
		expect(foundbyId).toStrictEqual(storiesTable[0].dataValues);
	});
	it("Should return an falsy value when find by id is called with an inexistent id", async () => {
		const notFoundbyId = await repository.findById(v4());
		expect(notFoundbyId).not.toBeTruthy(notFoundbyId);
	});
	it("Should create a new story by calling the method create", async () => {
		const createdStory = await repository.create({
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
		expect(await repository.findById(createdStory.id)).toEqual(expect.objectContaining(createdStory));
	});
	it("Should throw an exception if the method create is called without an userId", async () => {
		await expect(async () => {
			await repository.create({
				title: "created",
			});
		}).rejects.toThrowError();
	});
	it("Should throw an exception if the method create is called without an title", async () => {
		await expect(async () => {
			await repository.create({
				userId: "638013044e7c8f1e18b9448c",
			});
		}).rejects.toThrowError();
	});
	it("Should throw an exception if the method create is called without an title and user id", async () => {
		await expect(async () => {
			await repository.create({});
		}).rejects.toThrowError();
	});
	it("Should update a story by calling the method update", async () => {
		const originalStory = { ...storiesTable[0].dataValues };
		const editedStory = await repository.update(storiesTable[0].dataValues.id, {
			title: "edited Title",
			content: "edited content",
		});

		expect(editedStory).toEqual({
			...originalStory,
			title: "edited Title",
			content: "edited content",
			updatedAt: expect.any(Date),
		});

		expect(await repository.findById(editedStory.id)).toEqual(expect.objectContaining(editedStory));
	});
	it("Should remove a story by calling the method delete", async () => {
		const idToDelete = storiesTable[0].dataValues.id;
		await repository.delete(storiesTable[0].dataValues.id);
		const notFoundbyId = await repository.findById(idToDelete);
		expect(notFoundbyId).not.toBeTruthy(notFoundbyId);
	});
	it("Should return an array of stories by calling the method find by user id", async () => {
		const foundByUserId = await repository.findByUserId(storiesTable[0].dataValues.userId);
		expect(foundByUserId.lenght).not.toBe(0);
		expect(foundByUserId[0]).toStrictEqual(storiesTable[0].dataValues);
	});
	it("Should return an array of stories by calling the method find by user id with an id without stories", async () => {
		const foundByUserId = await repository.findByUserId(ObjectId());
		expect(foundByUserId).toStrictEqual([]);
	});
});
import { expect } from "@jest/globals";
import { StoryRepository } from "../../src/domain/repositories/story.repository";
import { CreateStoryUseCase } from "../../src/domain/story/use-cases/create-story.use-case";
import { sequelizeMock } from "../mocks/sequelize.mock";
import { resetStoriesTable } from "../mocks/stories-table.mock";
import { CreateStoryDTO } from "../../src/domain/story/dtos/createStory.dto";

describe("Create story use case", () => {
	resetStoriesTable();
	const repository = new StoryRepository(sequelizeMock);
	const useCase = new CreateStoryUseCase(repository);

	it("Should create a new story", async () => {
		const createdStory = await useCase.execute(new CreateStoryDTO("638013044e7c8f1e18b9448c", "created"));
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
	it("Should throw an error when given an empty userId value", async () => {
		expect(() => useCase.execute(new CreateStoryDTO("", "created"))).rejects.toThrow();
	});
	it("Should throw an error when given an userId value that is not a string", async () => {
		expect(() => useCase.execute(new CreateStoryDTO(<any>1, "created"))).rejects.toThrow();
	});
	it("Should throw an error when given an empty title value", async () => {
		expect(() => useCase.execute(new CreateStoryDTO("638013044e7c8f1e18b9448c", ""))).rejects.toThrow();
	});
	it("Should throw an error when given a title value that is not a string", async () => {
		expect(() => useCase.execute(new CreateStoryDTO("638013044e7c8f1e18b9448c", <any>1))).rejects.toThrow();
	});
	it("Should throw an error when given a content value that is not a string", async () => {
		expect(() =>
			useCase.execute(new CreateStoryDTO("638013044e7c8f1e18b9448c", "created", <any>1, 1))
		).rejects.toThrow();
	});
	it("Should throw an error when given an impressions value lower than zero", async () => {
		expect(() =>
			useCase.execute(new CreateStoryDTO("638013044e7c8f1e18b9448c", "created", "content", -1))
		).rejects.toThrow();
	});
	it("Should throw an error when given an impressions value that is not an integer", async () => {
		expect(() =>
			useCase.execute(new CreateStoryDTO("638013044e7c8f1e18b9448c", "created", "content", 1.5))
		).rejects.toThrow();
	});
});

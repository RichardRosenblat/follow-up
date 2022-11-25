import { jest } from "@jest/globals";
export const storiesTable = [
	{
		dataValues: {
			id: "f345431b-3d56-4ee3-a70e-e8b93f1bc3bb",
			userId: "638013044e7c8f1e18b9448c",
			title: "title0",
			content: "content0",
			impressions: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	},
	{
		dataValues: {
			id: "bff2e601-f786-470a-bc3a-956f35dbedae",
			userId: "638013044e7c8f1e18b9448c",
			title: "title1",
			content: "content1",
			impressions: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	},
	{
		dataValues: {
			id: "6ba2b9ca-f25f-42c8-ac2f-fc3f429c5990",
			userId: "638013044e7c8f1e18b94495",
			title: "title2",
			content: "content2",
			impressions: 2,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	},
];

export const sequelizeMock = {
	Story: {
		findAll: jest.fn((whereClause) => {
			if (whereClause) {
				return storiesTable.filter((story) => story.dataValues.userId === whereClause.where.userId);
			}
			return storiesTable;
		}),
		findOne: jest.fn(({ where: { id } }) => {
			return storiesTable.find((story) => story.dataValues.id === id);
		}),
		create: jest.fn((story) => {
			if (!story.id || !story.userId || !story.title) {
				throw Error("Mock not null rule break error");
			}
			if (!story.createdAt) {
				story.createdAt = new Date();
			}
			if (!story.updatedAt) {
				story.updatedAt = new Date();
			}
			if (!story.content) {
				story.content = "";
			}
			if (!story.impressions) {
				story.impressions = 0;
			}
			storiesTable.push({ dataValues: story });
			return storiesTable.find((searchStory) => searchStory.dataValues.id === story.id);
		}),
		update: jest.fn((updateInfo, { where: { id } }) => {
			console.log(id);
			const storyIndex = storiesTable.findIndex((story) => story.dataValues.id === id);
			storiesTable[storyIndex].dataValues = { ...storiesTable[storyIndex].dataValues, ...updateInfo };
		}),
		destroy: jest.fn(({ where: { id } }) => {
			const storyIndex = storiesTable.findIndex((story) => story.dataValues.id === id);
			storiesTable.splice(storyIndex, 1);
		}),
	},
};

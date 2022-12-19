import { storiesTable } from "./stories-table.mock";
import { v4 } from "uuid";
import { StoryEntity } from "../../src/domain/story/entities/story.entity";
import { CreateStoryDTO } from "../../src/domain/story/dtos/createStory.dto";
import { UpdateStoryDTO } from "../../src/domain/story/dtos/updateStory.dto";

interface whereId {
    where: {
        id: string;
    };
}
interface whereUserId {
    where: {
        userId: string;
    };
}
interface modelMock {
    findAll: jest.Mock<any, any>;
    findOne: jest.Mock<any, any>;
    create: jest.Mock<any, any>;
    update: jest.Mock<any, any>;
    destroy: jest.Mock<any, any>;
}

export const storyModelMock: modelMock = {
    findAll: jest.fn((whereClause?: whereUserId) => {
        if (whereClause) {
            return storiesTable.filter(
                (story) => story.dataValues.userId === whereClause.where.userId
            );
        }
        return storiesTable;
    }),
    findOne: jest.fn(({ where: { id } }: whereId) => {
        return storiesTable.find((story) => story.dataValues.id === id);
    }),
    create: jest.fn((story: CreateStoryDTO) => {
        if (!story.userId || !story.title) {
            throw Error("Mock not null rule break error");
        }

        const createdStory: StoryEntity = {
            id: v4(),
            userId: story.userId,
            title: story.title,
            content: story.content || "",
            impressions: story.impressions || 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        storiesTable.push({ dataValues: createdStory });
        return storiesTable.find((searchStory) => searchStory.dataValues.id === createdStory.id);
    }),
    update: jest.fn((updateInfo: UpdateStoryDTO, { where: { id } }: whereId) => {
        const storyIndex = storiesTable.findIndex((story) => story.dataValues.id === id);
        storiesTable[storyIndex].dataValues = {
            ...storiesTable[storyIndex].dataValues,
            ...updateInfo,
        };
    }),
    destroy: jest.fn(({ where: { id } }: whereId) => {
        const storyIndex = storiesTable.findIndex((story) => story.dataValues.id === id);
        storiesTable.splice(storyIndex, 1);
    }),
};

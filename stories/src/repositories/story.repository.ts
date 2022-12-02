import { v4 } from "uuid";
import { ICreateStory } from "../types/story/dtos/createStory.dto";
import { IDatabase } from "../types/db.type";
import { IUpdateStory } from "../types/story/dtos/updateStory.dto";
import { IStory } from "../types/story/entities/story.entity";

export class StoryRepository {
    constructor(private readonly database: IDatabase) {}
    async listAll(): Promise<IStory[]> {
        return (await this.database.Story.findAll()).map((story) => story?.dataValues);
    }
    async findById(uuid: string): Promise<IStory> {
        return (await this.database.Story.findOne({ where: { id: uuid } }))?.dataValues;
    }
    async create(story: ICreateStory): Promise<IStory> {
        return (await this.database.Story.create({ ...story, id: story.id || v4() }))?.dataValues;
    }
    async update(uuid: string, updateInfo: IUpdateStory): Promise<IStory> {
        await this.database.Story.update(updateInfo, { where: { id: uuid } });
        return (await this.database.Story.findOne({ where: { id: uuid } }))?.dataValues;
    }
    async delete(uuid: string): Promise<void> {
        await this.database.Story.destroy({ where: { id: uuid } });
    }
    async findByUserId(userId: string): Promise<IStory[]> {
        return (await this.database.Story.findAll({ where: { userId: userId } })).map(
            (story) => story?.dataValues
        );
    }
}

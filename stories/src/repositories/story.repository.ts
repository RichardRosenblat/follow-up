import { v4, validate as isUuid } from "uuid";
import { IDatabase } from "../types/database.type";
import { CreateStoryDTO } from "../dtos/createStory.dto";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";
import { StoryEntity } from "../entities/story.entity";

export class StoryRepository {
    constructor(private readonly database: IDatabase) {}
    public async listAll(): Promise<StoryEntity[]> {
        return (await this.database.tables.Story.findAll()).map((story) => story.dataValues);
    }
    public async findById(uuid: string): Promise<StoryEntity> {
        return (await this.database.tables.Story.findOne({ where: { id: uuid } }))?.dataValues;
    }
    public async create(story: CreateStoryDTO): Promise<StoryEntity> {
        return (await this.database.tables.Story.create({ ...story, id: v4() }))?.dataValues;
    }
    public async update(uuid: string, updateInfo: UpdateStoryDTO): Promise<StoryEntity> {
        await this.database.tables.Story.update(updateInfo, { where: { id: uuid } });
        return (await this.database.tables.Story.findOne({ where: { id: uuid } }))?.dataValues;
    }
    public async delete(uuid: string): Promise<void> {
        await this.database.tables.Story.destroy({ where: { id: uuid } });
    }
    public async findByUserId(userId: string): Promise<StoryEntity[]> {
        return (await this.database.tables.Story.findAll({ where: { userId: userId } })).map(
            (story) => story?.dataValues
        );
    }
    public async doesUuidExists(uuid: string) {
        return isUuid(uuid) && !!(await this.findById(uuid));
    }
}

import { Inject, Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Model, ModelStatic } from "sequelize";
import { IDatabase } from "src/types/database.type";
import { v4, validate as isUuid } from "uuid";
import { CreateStoryDTO } from "../dtos/createStory.dto";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";
import { StoryEntity } from "../entities/story.entity";

@Injectable()
export class StoryRepository {
    private readonly stories: ModelStatic<Model<any, any>>;

    constructor(@Inject("IDatabase") database: IDatabase) {
        this.stories = database.tables.Story;
    }

    public async listAll(): Promise<StoryEntity[]> {
        return (await this.stories.findAll()).map((story) => story.dataValues);
    }

    public async findById(id: string): Promise<StoryEntity> {
        return (await this.stories.findOne({ where: { id } }))?.dataValues;
    }

    public async create(story: CreateStoryDTO): Promise<StoryEntity> {
        return (await this.stories.create({ ...story, id: v4() }))?.dataValues;
    }

    public async update(id: string, updateInfo: UpdateStoryDTO): Promise<StoryEntity> {
        await this.stories.update(updateInfo, { where: { id } });
        return (await this.stories.findOne({ where: { id } }))?.dataValues;
    }

    public async delete(id: string): Promise<void> {
        await this.stories.destroy({ where: { id } });
    }

    public async findByUserId(userId: string): Promise<StoryEntity[]> {
        return (await this.stories.findAll({ where: { userId: userId } })).map(
            (story) => story?.dataValues
        );
    }

    public async doesIdExists(id: string) {
        return isUuid(id) && !!(await this.findById(id));
    }
}

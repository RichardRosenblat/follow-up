import { CreateStoryDTO } from "../dtos/createStory.dto";
import { StoryEntity } from "../entities/story.entity";
import { Injectable } from "@nestjs/common";
import { StoryRepository } from "../repositories/story.repository";

@Injectable()
export class CreateStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(story: CreateStoryDTO): Promise<StoryEntity> {
        return this.repository.create(story);
    }
}

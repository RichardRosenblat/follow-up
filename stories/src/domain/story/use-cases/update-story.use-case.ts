import { StoryRepository } from "../repositories/story.repository";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";
import { StoryEntity } from "../entities/story.entity";
import { storyNotFoundError } from "../dtos/errors/storyNotFoundError";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(storyId: string, story: UpdateStoryDTO): Promise<StoryEntity> {
        const idExists = await this.repository.doesIdExists(storyId);
        if (!idExists) {
            throw storyNotFoundError;
        }
        return this.repository.update(storyId, story);
    }
}

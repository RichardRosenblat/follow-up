import { StoryEntity } from "../entities/story.entity";
import { Injectable } from "@nestjs/common";
import { storyNotFoundError } from "../dtos/errors/storyNotFoundError";
import { StoryRepository } from "../repositories/story.repository";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";

@Injectable()
export class UpdateStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(storyUuid: string, story: UpdateStoryDTO): Promise<StoryEntity> {
        const uuidExists = await this.repository.doesUuidExists(storyUuid);
        if (!uuidExists) {
            throw storyNotFoundError;
        }
        return this.repository.update(storyUuid, story);
    }
}

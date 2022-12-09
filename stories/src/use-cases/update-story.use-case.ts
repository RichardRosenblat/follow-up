import { StoryRepository } from "../repositories/story.repository";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";
import { StoryEntity } from "../entities/story.entity";
import { validateAndThrowCustomError } from "../util/validateAndThrowCustomError";
export class UpdateStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(storyUuid: string, story: UpdateStoryDTO): Promise<StoryEntity> {
        
        const uuidExists = (await this.repository.doesUuidExists(storyUuid))
            ? []
            : ["story uuid not found"];
        await validateAndThrowCustomError(story, uuidExists);
        return this.repository.update(storyUuid, story);
    }
}

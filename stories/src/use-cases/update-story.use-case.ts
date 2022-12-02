import { StoryRepository } from "../repositories/story.repository";
import { IUpdateStory } from "../types/story/dtos/updateStory.dto";
import { IStory } from "../types/story/entities/story.entity";
export class UpdateStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    execute(storyUuid: string, story: IUpdateStory): Promise<IStory> {
        return this.repository.update(storyUuid, story);
    }
}

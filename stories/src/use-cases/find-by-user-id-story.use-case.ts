import { StoryRepository } from "../repositories/story.repository";
import { IStory } from "../types/story/entities/story.entity";
export class UpdateStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    execute(userId: string): Promise<IStory[]> {
        return this.repository.findByUserId(userId);
    }
}

import { StoryRepository } from "../repositories/story.repository";
export class DeleteStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    execute(storyUuid: string): Promise<void> {
        return this.repository.delete(storyUuid);
    }
}

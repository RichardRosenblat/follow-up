import { StoryRepository } from "../repositories/story.repository";
export class DeleteStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(storyUuid: string): Promise<void> {
        const uuidExists = await this.repository.doesUuidExists(storyUuid);
        if (!uuidExists) {
            throw new Error('["story uuid not found"]');
        }
        return this.repository.delete(storyUuid);
    }
}

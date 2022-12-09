import { StoryRepository } from "../repositories/story.repository";
import { StoryEntity } from "../entities/story.entity";
export class FindByUserIdStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public execute(userId: string): Promise<StoryEntity[]> {
        return this.repository.findByUserId(userId);
    }
}

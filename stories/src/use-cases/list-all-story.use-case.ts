import { StoryRepository } from "../repositories/story.repository";
import { IStory } from '../types/story/entities/story.entity';
export class FindByIdStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    execute(): Promise<IStory[]> {
        return this.repository.listAll();
    }
}

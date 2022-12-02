import { StoryRepository } from "../repositories/story.repository";
import { ICreateStory } from "../types/story/dtos/createStory.dto";
import { IStory } from "../types/story/entities/story.entity";
export class CreateStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    execute(story: ICreateStory): Promise<IStory> {
        return this.repository.create(story);
    }
}

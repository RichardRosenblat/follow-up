import { StoryRepository } from "../repositories/story.repository";
import { CreateStoryDTO } from "../dtos/createStory.dto";
import { StoryEntity } from "../entities/story.entity";
import { validateAndThrowCustomError } from "../util/validateAndThrowCustomError";
export class CreateStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(story: CreateStoryDTO): Promise<StoryEntity> {
        await validateAndThrowCustomError(story);
        return this.repository.create(story);
    }
}

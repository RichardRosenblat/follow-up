import { StoryRepository } from "../repositories/story.repository";
import { StoryEntity } from "../entities/story.entity";
import { validate } from "uuid";
export class FindByIdStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(storyUuid: string): Promise<StoryEntity> {
        const foundById = validate(storyUuid)
            ? await this.repository.findById(storyUuid)
            : undefined;

        if (!foundById) {
            throw new Error('["story uuid not found"]');
        }
        return foundById;
    }
}

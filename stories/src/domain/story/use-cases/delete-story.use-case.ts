import { Injectable } from "@nestjs/common";
import { storyNotFoundError } from "../dtos/errors/storyNotFoundError";
import { StoryRepository } from "../repositories/story.repository";

@Injectable()
export class DeleteStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(storyId: string): Promise<void> {
        const idExists = await this.repository.doesIdExists(storyId);
        if (!idExists) {
            throw storyNotFoundError;
        }
        return this.repository.delete(storyId);
    }
}

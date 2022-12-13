import { Injectable } from "@nestjs/common";
import { storyNotFoundError } from "src/domain/story/dtos/errors/storyNotFoundError";
import { StoryRepository } from "../repositories/story.repository";

@Injectable()
export class DeleteStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public async execute(storyUuid: string): Promise<void> {
        const uuidExists = await this.repository.doesUuidExists(storyUuid);
        if (!uuidExists) {
            throw storyNotFoundError;
        }
        return this.repository.delete(storyUuid);
    }
}

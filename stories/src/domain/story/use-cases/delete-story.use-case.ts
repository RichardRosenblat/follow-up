import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { StoryRepository } from "../repositories/story.repository";
import { storyNotFoundErrorBody } from "../errors/story-not-found.error";

@Injectable()
export class DeleteStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(storyId: string): Promise<void> {
		const idExists = await this.repository.doesIdExists(storyId);
		if (!idExists) {
			throw new NotFoundException(storyNotFoundErrorBody);
		}
		return this.repository.delete(storyId);
	}
}

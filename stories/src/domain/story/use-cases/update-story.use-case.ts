import { Injectable, NotFoundException } from "@nestjs/common";
import { StoryDTO } from "../dtos/story.dto";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";
import { StoryRepository } from "../repositories/story.repository";
import { storyNotFoundErrorBody } from "../errors/story-not-found.error";

@Injectable()
export class UpdateStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(storyId: string, story: UpdateStoryDTO): Promise<StoryDTO> {
		const idExists = await this.repository.doesIdExists(storyId);
		if (!idExists) {
			throw new NotFoundException(storyNotFoundErrorBody);
		}
		const updatedStory = await this.repository.update(storyId, story);
		return new StoryDTO(updatedStory);
	}
}

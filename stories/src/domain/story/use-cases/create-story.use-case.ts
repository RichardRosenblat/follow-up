import { CreateStoryDTO } from "../dtos/createStory.dto";
import { Injectable } from "@nestjs/common";
import { StoryRepository } from "../repositories/story.repository";
import { StoryDTO } from "../dtos/story.dto";

@Injectable()
export class CreateStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(story: CreateStoryDTO): Promise<StoryDTO> {
		const createdStory = await this.repository.create(story);
		return new StoryDTO(createdStory);
	}
}

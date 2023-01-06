import { Injectable } from "@nestjs/common";
import { StoryRepository } from "../repositories/story.repository";
import { StoryEntity } from "../entities/story.entity";
import { StoryDTO } from "../dtos/story.dto";

@Injectable()
export class ListAllStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(): Promise<StoryDTO[]> {
		const allStories = await this.repository.listAll();
		return allStories.map((entity) => new StoryDTO(entity));
	}
}

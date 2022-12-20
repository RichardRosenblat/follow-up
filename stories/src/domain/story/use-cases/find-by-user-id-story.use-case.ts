import { Injectable } from "@nestjs/common";
import { StoryRepository } from "../repositories/story.repository";
import { StoryEntity } from "../entities/story.entity";
import { StoryDTO } from "../dtos/story.dto";

@Injectable()
export class FindByUserIdStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(userId: string): Promise<StoryDTO[]> {
		const foundStories = await this.repository.findByUserId(userId);
		return foundStories.map((entity) => new StoryDTO(entity));
	}
}

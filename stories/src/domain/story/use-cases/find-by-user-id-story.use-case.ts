import { Injectable } from "@nestjs/common";
import { StoryRepository } from "../repositories/story.repository";
import { StoryEntity } from "../entities/story.entity";

@Injectable()
export class FindByUserIdStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(userId: string): Promise<StoryEntity[]> {
		return this.repository.findByUserId(userId);
	}
}

import { StoryEntity } from "../entities/story.entity";
import { validate as isUuid } from "uuid";
import { Injectable } from "@nestjs/common";
import { storyNotFoundError } from "../dtos/errors/storyNotFoundError";
import { StoryRepository } from "../repositories/story.repository";

@Injectable()
export class FindByIdStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(storyId: string): Promise<StoryEntity> {
		const foundById = isUuid(storyId) && await this.repository.findById(storyId);		

		if (!foundById) {
			throw storyNotFoundError;
		}

		return foundById;
	}
}

import { StoryEntity } from "../entities/story.entity";
import { validate } from "uuid";
import { Injectable } from "@nestjs/common";
import { storyNotFoundError } from "../dtos/errors/storyNotFoundError";
import { StoryRepository } from "../repositories/story.repository";

@Injectable()
export class FindByIdStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(storyUuid: string): Promise<StoryEntity> {
		const foundById = validate(storyUuid) ? await this.repository.findById(storyUuid) : undefined;

		if (!foundById) {
			throw storyNotFoundError;
		}

		return foundById;
	}
}

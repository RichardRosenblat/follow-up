import { Injectable, NotFoundException } from "@nestjs/common";
import { validate as isUuid } from "uuid";
import { StoryDTO } from "../dtos/story.dto";
import { StoryRepository } from "../repositories/story.repository";
import { storyNotFoundErrorBody } from "../errors/story-not-found.error";

@Injectable()
export class FindByIdStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(storyId: string): Promise<StoryDTO> {
		const foundById = isUuid(storyId) && (await this.repository.findById(storyId));

		if (!foundById) {
			throw new NotFoundException(storyNotFoundErrorBody);
		}

		return new StoryDTO(foundById);
	}
}

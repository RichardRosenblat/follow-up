import { StoryEntity } from "../entities/story.entity";
import { validate as isUuid } from "uuid";
import { HttpStatus, Injectable } from "@nestjs/common";
import { StoryRepository } from "../repositories/story.repository";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { StoryDTO } from "../dtos/story.dto";

@Injectable()
export class FindByIdStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(storyId: string): Promise<StoryDTO> {
		const foundById = isUuid(storyId) && (await this.repository.findById(storyId));

		if (!foundById) {
			throw new HttpErrorByCode[HttpStatus.NOT_FOUND](["story not found"]);
		}

		return new StoryDTO(foundById);
	}
}

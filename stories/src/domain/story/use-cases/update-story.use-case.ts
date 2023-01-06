import { StoryRepository } from "../repositories/story.repository";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";
import { StoryEntity } from "../entities/story.entity";
import { HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { StoryDTO } from "../dtos/story.dto";

@Injectable()
export class UpdateStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(storyId: string, story: UpdateStoryDTO): Promise<StoryDTO> {
		const idExists = await this.repository.doesIdExists(storyId);
		if (!idExists) {
			throw new HttpErrorByCode[HttpStatus.NOT_FOUND](["story not found"]);
		}
		const updatedStory = await this.repository.update(storyId, story);
		return new StoryDTO(updatedStory);
	}
}

import { HttpStatus, Injectable } from "@nestjs/common";
import { StoryRepository } from "../repositories/story.repository";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

@Injectable()
export class DeleteStoryUseCase {
	constructor(private readonly repository: StoryRepository) {}

	public async execute(storyId: string): Promise<void> {
		const idExists = await this.repository.doesIdExists(storyId);
		if (!idExists) {
			throw new HttpErrorByCode[HttpStatus.NOT_FOUND](["story not found"]);
		}
		return this.repository.delete(storyId);
	}
}

import { Body, Controller, Post } from "@nestjs/common";
import { CreateStoryDTO } from "../dtos/createStory.dto";
import { StoryEntity } from "../entities/story.entity";
import { CreateStoryUseCase } from "../use-cases/create-story.use-case";

@Controller({ path: "story", version: "1" })
export class CreateStoryController {
	constructor(private readonly create: CreateStoryUseCase) {}

	@Post()
	public execute(@Body() story: CreateStoryDTO): Promise<StoryEntity> {
		return this.create.execute(story);
	}
}

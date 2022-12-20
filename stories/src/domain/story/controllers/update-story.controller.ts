import { Body, Controller, Param, Patch } from "@nestjs/common";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";
import { StoryEntity } from "../entities/story.entity";
import { UpdateStoryUseCase } from "../use-cases/update-story.use-case";

@Controller("v1/story")
export class UpdateStoryController {
	constructor(private readonly update: UpdateStoryUseCase) {}

	@Patch("/:id")
	public updateStory(@Param("id") id: string, @Body() story: UpdateStoryDTO): Promise<StoryEntity> {
		return this.update.execute(id, story);
	}
}

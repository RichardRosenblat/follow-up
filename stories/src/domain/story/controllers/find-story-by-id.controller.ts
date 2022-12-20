import { Controller, Get, Param } from "@nestjs/common";
import { StoryEntity } from "../entities/story.entity";
import { FindByIdStoryUseCase } from "../use-cases/find-by-id-story.use-case";

@Controller("v1/story")
export class FindStoryByIdController {
	constructor(private readonly findById: FindByIdStoryUseCase) {}

	@Get("/:id")
	public execute(@Param("id") id: string): Promise<StoryEntity> {
		return this.findById.execute(id);
	}
}

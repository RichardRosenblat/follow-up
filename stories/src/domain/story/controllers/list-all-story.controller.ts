import { Controller, Get, Query } from "@nestjs/common";
import { StoryEntity } from "../entities/story.entity";
import { FindByUserIdStoryUseCase } from "../use-cases/find-by-user-id-story.use-case";
import { ListAllStoryUseCase } from "../use-cases/list-all-story.use-case";

@Controller("v1/story")
export class ListAllStoryController {
	constructor(
		private readonly listAll: ListAllStoryUseCase,
		private readonly byUserId: FindByUserIdStoryUseCase,
    ) {}

	@Get()
	public execute(@Query("userId") userId?: string): Promise<StoryEntity[]> {
		if (userId) {
			return this.byUserId.execute(userId);
		}
		return this.listAll.execute();
	}

	
}

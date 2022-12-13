import { Module } from "@nestjs/common";
import { StoryController } from "./controller/story.controller";
import { StoryRepository } from "./repositories/story.repository";
import { CreateStoryUseCase } from "./use-cases/create-story.use-case";
import { DeleteStoryUseCase } from "./use-cases/delete-story.use-case";
import { FindByIdStoryUseCase } from "./use-cases/find-by-id-story.use-case";
import { FindByUserIdStoryUseCase } from "./use-cases/find-by-user-id-story.use-case";
import { ListAllStoryUseCase } from "./use-cases/list-all-story.use-case";
import { UpdateStoryUseCase } from "./use-cases/update-story.use-case";

@Module({
	imports: [],
	controllers: [StoryController],
	providers: [
		StoryRepository,
		ListAllStoryUseCase,
		FindByIdStoryUseCase,
		CreateStoryUseCase,
		DeleteStoryUseCase,
		FindByUserIdStoryUseCase,
		UpdateStoryUseCase
	],
})
export class StoryModule {}

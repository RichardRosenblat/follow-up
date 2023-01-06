import { Module } from "@nestjs/common";
import { StoryRepository } from "./repositories/story.repository";
import { UserService } from "./services/user.service";
import { CreateStoryUseCase } from "./use-cases/create-story.use-case";
import { DeleteStoryUseCase } from "./use-cases/delete-story.use-case";
import { FindByIdStoryUseCase } from "./use-cases/find-by-id-story.use-case";
import { FindByUserIdStoryUseCase } from "./use-cases/find-by-user-id-story.use-case";
import { ListAllStoryUseCase } from "./use-cases/list-all-story.use-case";
import { UpdateStoryUseCase } from "./use-cases/update-story.use-case";
import { doesUserIdExists } from "./validators/doesUserIdExists";
import { CreateStoryController } from "./controllers/create-story.controller";
import { UpdateStoryController } from "./controllers/update-story.controller";
import { ListAllStoryController } from "./controllers/list-all-story.controller";
import { FindStoryByIdController } from "./controllers/find-story-by-id.controller";
import { DeleteStoryController } from "./controllers/delete-story.controller";

@Module({
	controllers: [
		ListAllStoryController,
		FindStoryByIdController,
		CreateStoryController,
		UpdateStoryController,
		DeleteStoryController
	],
	providers: [
		StoryRepository,
		ListAllStoryUseCase,
		FindByIdStoryUseCase,
		CreateStoryUseCase,
		DeleteStoryUseCase,
		FindByUserIdStoryUseCase,
		UpdateStoryUseCase,
		UserService,
		doesUserIdExists
	],
})
export class StoryModule {}

import { Delete, Post } from "@nestjs/common";
import { HttpCode } from "@nestjs/common";
import { Patch } from "@nestjs/common";
import { Query } from "@nestjs/common";
import { Param } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Controller, Get } from "@nestjs/common";
import { CreateStoryDTO } from "../dtos/createStory.dto";
import { UpdateStoryDTO } from "../dtos/updateStory.dto";
import { StoryEntity } from "../entities/story.entity";
import { CreateStoryUseCase } from "../use-cases/create-story.use-case";
import { DeleteStoryUseCase } from "../use-cases/delete-story.use-case";
import { FindByIdStoryUseCase } from "../use-cases/find-by-id-story.use-case";
import { FindByUserIdStoryUseCase } from "../use-cases/find-by-user-id-story.use-case";
import { ListAllStoryUseCase } from "../use-cases/list-all-story.use-case";
import { UpdateStoryUseCase } from "../use-cases/update-story.use-case";

@Controller("v1/story")
export class StoryController {
	constructor(
    private readonly listAll: ListAllStoryUseCase,
    private readonly findById: FindByIdStoryUseCase,
	private readonly create: CreateStoryUseCase,
	private readonly remove: DeleteStoryUseCase,
	private readonly byUserId: FindByUserIdStoryUseCase,
	private readonly update: UpdateStoryUseCase,
    ) {}

	@Get()
	public getlistAllStories(@Query("userId") userId?: string): Promise<StoryEntity[]> {
		if (userId) {
			return this.byUserId.execute(userId);
		}
		return this.listAll.execute();
	}
	@Get("/:id")
	public getStoryById(@Param("id") id: string): Promise<StoryEntity> {
		return this.findById.execute(id);
	}
	@Post()
	public createStory(@Body() story: CreateStoryDTO): Promise<StoryEntity> {
		return this.create.execute(story);
	}
	@Patch('/:id')
	public updateStory(@Param('id') id:string,@Body() story: UpdateStoryDTO): Promise<StoryEntity> {
		return this.update.execute(id, story);
	}
	@HttpCode(204)
	@Delete("/:id")
	public async deleteStoryById(@Param("id") id: string): Promise<void> {
		await this.remove.execute(id);
		
	}
}

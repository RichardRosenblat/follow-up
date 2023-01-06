import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteStoryUseCase } from "../use-cases/delete-story.use-case";

@Controller("v1/story")
export class DeleteStoryController {
	constructor(
	private readonly remove: DeleteStoryUseCase,
    ) {}

	@HttpCode(204)
	@Delete("/:id")
	public async execute(@Param("id") id: string): Promise<void> {
		await this.remove.execute(id);
		
	}
}

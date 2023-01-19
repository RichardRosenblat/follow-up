import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteStoryUseCase } from "../use-cases/delete-story.use-case";

@Controller({ path: "story", version: "1" })
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

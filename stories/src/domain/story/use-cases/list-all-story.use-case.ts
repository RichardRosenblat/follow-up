import { Injectable } from "@nestjs/common";
import { StoryRepository } from "../repositories/story.repository";
import { StoryEntity } from "../entities/story.entity";

@Injectable()
export class ListAllStoryUseCase {
    constructor(private readonly repository: StoryRepository) {}

    public execute(): Promise<StoryEntity[]> {
        return this.repository.listAll();
    }
}

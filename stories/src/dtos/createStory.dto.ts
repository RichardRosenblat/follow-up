import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { StoryEntity } from "../entities/story.entity";

export class CreateStoryDTO implements Omit<StoryEntity, "id" | "createdAt" | "updatedAt"> {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string = "";

    @IsOptional()
    @Min(0)
    @IsInt()
    impressions: number = 0;

    constructor(userId: string, title: string, content?: string, impressions?: number) {
        this.userId = userId;
        this.title = title;
        content && (this.content = content);
        impressions && (this.impressions = impressions);
    }
}

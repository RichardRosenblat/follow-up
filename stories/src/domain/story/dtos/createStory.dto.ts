import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { StoryEntity } from "../entities/story.entity";
import { ExistingUserId } from "../validators/doesUserIdExists";

export class CreateStoryDTO implements Omit<StoryEntity, "id" | "createdAt" | "updatedAt"> {
    @IsNotEmpty()
    @IsString()
    @ExistingUserId()
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
}

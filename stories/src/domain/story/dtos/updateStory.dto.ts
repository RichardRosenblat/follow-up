import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { ExistingUserId } from "../validators/doesUserIdExists";
import { CreateStoryDTO } from "./createStory.dto";

export class UpdateStoryDTO implements Partial<CreateStoryDTO> {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ExistingUserId()
    userId?: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @Min(0)
    @IsInt()
    impressions?: number;

}

import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { CreateStoryDTO } from "./createStory.dto";

export class UpdateStoryDTO implements Partial<CreateStoryDTO> {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
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

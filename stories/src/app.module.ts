import { Module } from "@nestjs/common";
import { InfraModule } from "./database/infra.module";
import { StoryModule } from "./domain/story/story.module";

@Module({
	imports: [StoryModule, InfraModule],
})
export class AppModule {}

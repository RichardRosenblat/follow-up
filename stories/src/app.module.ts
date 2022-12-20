import { Module } from "@nestjs/common";
import { InfraModule } from "./infra/infra.module";
import { StoryModule } from "./domain/story/story.module";
import { HealthCheckModule } from "./domain/health-check/health-check.module";

@Module({
	imports: [StoryModule, InfraModule, HealthCheckModule],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { healthCheckController } from "./controller/healthCheck.controller";
import { HealthCheckRepository } from "./repository/health-check.repository";
import { HealthCheckUseCase } from "./use-cases/health-check.use-case";

@Module({
	imports: [],
	controllers: [healthCheckController],
	providers: [HealthCheckRepository, HealthCheckUseCase],
})
export class HealthCheckModule {}

import { Controller, Get } from "@nestjs/common";
import { HealthCheckUseCase } from "../use-cases/health-check.use-case";

@Controller()
export class healthCheckController {
	constructor(private readonly useCase: HealthCheckUseCase) {}
	
	@Get()
	public async checkHealth() {
        const databaseStatus = await this.useCase.execute();
		return {
			server: "Ok",
			database: databaseStatus,
		};
	}
}

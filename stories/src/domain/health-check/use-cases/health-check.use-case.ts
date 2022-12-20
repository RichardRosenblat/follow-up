import { Injectable } from "@nestjs/common";
import { HealthCheckRepository } from "../repository/health-check.repository";

@Injectable()
export class HealthCheckUseCase {
	constructor(private readonly repository: HealthCheckRepository) {}

	public async execute(): Promise<"Connected" | "Unavailable"> {
		return (await this.repository.healthCheck()) ? "Connected" : "Unavailable";
	}
}

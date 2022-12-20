import { Inject, Injectable } from "@nestjs/common";
import { IDatabase } from "src/infra/types/database.type";

@Injectable()
export class HealthCheckRepository {
	constructor(@Inject("IDatabase") private readonly database: IDatabase) {}

	public async healthCheck(): Promise<boolean> {
		try {
			await this.database.connection.authenticate();
			return true;
		} catch (error) {
			console.log(error.message);
			return false;
		}
	}
}

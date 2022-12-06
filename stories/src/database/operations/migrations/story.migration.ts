import { IDatabase } from "../../../types/database.type";
import { IMigration } from "../../../types/infra/migration.type";

export class StoryMigration implements IMigration {
	constructor(private readonly database: IDatabase) {}

	async up(): Promise<void> {
		console.log("Migrating stories table...");
		try {
			await this.database.tables.Story.sync({ logging: false });
			console.log("Stories table is now syncronized to model!");
		} catch (error) {
			this.logSeedingError("Unnable to migrate stories table", error);
		}
		console.log();
	}
	async down(): Promise<void> {
		console.log("Reverting migration of stories table...");
		try {
			await this.database.tables.Story.drop({ logging: false });
			console.log("Stories table has been dropped!");
		} catch (error: any) {
			this.logSeedingError("Unnable to revert stories table's migration", error);
		}
		console.log();
	}
	private logSeedingError(message: string, error: any): void {
		console.log();
		console.log(`An error ocurred while migrating the Stories table: ${message}`);
		console.error(error.message);
		console.log();
	}
}

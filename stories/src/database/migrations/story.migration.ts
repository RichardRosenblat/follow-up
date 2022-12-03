import { IDatabase } from "../../types/database.type";
import { IMigration } from "../../types/infra/migration.type";

export class StoryMigration implements IMigration {
    constructor(private readonly database: IDatabase) {}

    async up(): Promise<void> {
        this.database.tables.Story.sync();
    }
    async down(): Promise<void> {
        this.database.tables.Story.drop();
    }
}

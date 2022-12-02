import { IMigration } from "../../types/infra/migration.type";
import { IDatabase } from "../../types/db.type";

export class StoryMigration implements IMigration {
    constructor(private readonly db: IDatabase) {}

    async up():Promise<void> {
        this.db.Story.sync();
    }
    async down():Promise<void> {
        this.db.Story.drop();
    }
}

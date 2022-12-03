import { IMigration } from "../../types/infra/migration.type";
import database from "../database";
import { StoryMigration } from "./story.migration";

const migrations: IMigration[] = [new StoryMigration(database)];

async function migrateDatabase(operation: "up" | "down"): Promise<void> {
    for (let i = 0; i < migrations.length; i++) {
        const seed = migrations[i];
        await seed[operation]();
    }
}
const operationArg = process.argv[2] || "";

if (operationArg.toLowerCase() === "up") {
    console.log("Migrating database");

    migrateDatabase("up");
}
if (operationArg.toLowerCase() === "down") {
    console.log("Reverting database migration");

    migrateDatabase("down");
}

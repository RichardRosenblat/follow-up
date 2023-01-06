import { IMigration } from "../types/migration.type";
import { connection as sequelize } from "../../infra/connections/connectionsManager";
import migrations from "./migrations/migrations";
import seeds from "./seeds/seeds";

interface databaseOperations {
	migrations: IMigration;
	seeds: IMigration;
}

const databaseOperations: databaseOperations = {
	migrations: {
		up: () => migrateDatabase(migrations, "up"),
		down: () => migrateDatabase(migrations, "down"),
	},
	seeds: {
		up: () => migrateDatabase(seeds, "up"),
		down: () => migrateDatabase(seeds, "down"),
	},
};

const operationType = <keyof databaseOperations>(process.argv[2] || "");
const operationArg = <keyof IMigration>(process.argv[3] || "");

const migration = databaseOperations[operationType];

migration && migration[operationArg] && migration[operationArg]();


async function migrateDatabase(migrations: IMigration[], operation: keyof IMigration): Promise<void> {
	for (let i = 0; i < migrations.length; i++) {
		const seed = migrations[i];
		await seed[operation]();
	}
    sequelize.close()
}

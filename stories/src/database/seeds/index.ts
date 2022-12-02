import { StorySeed } from "./story.seed";
import { IMigration } from "../../types/infra/migration.type";
import db from "../db";

const seeds: IMigration[] = [new StorySeed(db)];

async function seedDatabase(operation: "up" | "down"): Promise<void> {
    for (let i = 0; i < seeds.length; i++) {
        const seed = seeds[i];
        await seed[operation]();
    }
}

const operationArg = process.argv[2] || "";

if (operationArg.toLowerCase() === "up") {
    console.log("Seeding database");

    seedDatabase("up");
}
if (operationArg.toLowerCase() === "down") {
    console.log("Reverting database seeding");

    seedDatabase("down");
}

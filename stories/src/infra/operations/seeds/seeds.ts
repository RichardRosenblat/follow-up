import { IMigration } from "../../types/migration.type";
import { Database } from "../../database";
import { StorySeed } from "./story.seed";

const database = new Database();

const seeds: IMigration[] = [new StorySeed(database)];

export default seeds;

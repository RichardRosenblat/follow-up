import { IMigration } from "../../../types/infra/migration.type";
import { Database } from "../../database";
import { StoryMigration } from "./story.migration";

const database = new Database();

const migrations: IMigration[] = [new StoryMigration(database)];

export default migrations;

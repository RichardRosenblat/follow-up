import { IMigration } from "../../../types/infra/migration.type";
import database from "../../database";
import { StoryMigration } from "./story.migration";

const migrations: IMigration[] = [new StoryMigration(database)];

export default migrations;

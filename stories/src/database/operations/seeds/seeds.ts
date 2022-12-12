import { IMigration } from "../../../types/infra/migration.type";
import database from "../../database";
import { StorySeed } from "./story.seed";

const seeds: IMigration[] = [new StorySeed(database)];

export default seeds;

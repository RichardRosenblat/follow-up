import { ObjectId } from "mongodb";

export class UuidManager {
    static getUuid(uuid) {
        return new ObjectId(uuid);
    }

    static isValidUuid(uuid) {
        return ObjectId.isValid(uuid);
    }
}

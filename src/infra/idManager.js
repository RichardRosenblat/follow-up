import { ObjectId } from "mongodb";

export function getId(uuid) {
    return new ObjectId(uuid);
}

export function isValidId(uuid) {
    return ObjectId.isValid(uuid);
}

import crypto from "crypto";
import { save } from "../repository/account.repository.js";
import { createAccoundValidator } from "../validators/create-account.validator.js";

export function createUser(name, email, password) {
    const validationResults = createAccoundValidator(name, email, password);
    if (validationResults.hasErrors) {
        return validationResults.errors.map((error) => error.message);
    }
    const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        creationDate: new Date().toISOString().slice(0, 10),
    };
    return save(newUser);
}

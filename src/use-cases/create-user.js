import { AccountEntity } from "../entidades/conta.entity.js";
import { save } from "../repository/account.repository.js";
import { createAccoundValidator } from "../validators/create-account.validator.js";

export function createUser(name, email, password) {
    const validationResults = createAccoundValidator(name, email, password);
    if (validationResults.hasErrors) {
        return validationResults.errors.map((error) => error.message);
    }
    const newUser = new AccountEntity(name, email, password);
    return save(newUser);
}

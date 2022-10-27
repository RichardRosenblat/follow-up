import { AccountEntity } from "../entities/account.entity.js";
import { save } from "../repository/account.repository.js";
import { createAccoundValidator } from "../validators/create-account.validator.js";

export class CreateUserUseCase {
    constructor(accountRepository) {
        this.repository = accountRepository;
    }

    excecute(name, email, password) {
        const validationResults = createAccoundValidator(name, email, password);
        if (validationResults.hasErrors) {
            return validationResults.errors.map((error) => error.message);
        }
        const newUser = new AccountEntity(name, email, password);
        return save(newUser);
    }
}

import { AccountEntity } from "../entities/account.entity.js";
import { CreateAccountValidator } from "../validators/create-account.validator.js";

export class CreateUserUseCase {
    #repository;
    #validator;

    constructor(accountRepository) {
        this.#repository = accountRepository;
        this.#validator = new CreateAccountValidator(this.#repository);
    }

    execute(name, email, password) {
        const validationResult = this.#validator.execute(name, email, password);

        if (validationResult.hasErrors) {
            return validationResult.errors.map((error) => error.message);
        }
        
        const newUser = new AccountEntity(name, email, password);
        return this.#repository.save(newUser);
    }
}

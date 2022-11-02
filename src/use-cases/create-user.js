import { UserEntity } from "../entities/user.entity.js";
import { CreateUserValidator } from "../validators/create-user.validator.js";

export class CreateUserUseCase {
    #repository;
    #validator;

    constructor(userRepository) {
        this.#repository = userRepository;
        this.#validator = new CreateUserValidator(this.#repository);
    }

    execute(name, email, password) {
        const validationResult = this.#validator.execute(name, email, password);

        if (validationResult.hasErrors) {
            return validationResult.errors.map((error) => error.message);
        }
        
        const newUser = new UserEntity(name, email, password);
        return this.#repository.save(newUser);
    }
}

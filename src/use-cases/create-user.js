import { UserEntity } from "../entities/user.entity.js";
import { CreateUserValidator } from "../validators/create-user.validator.js";

export class CreateUserUseCase {
    #repository;
    #validator;

    constructor(userRepository) {
        this.#repository = userRepository;
        this.#validator = new CreateUserValidator(this.#repository);
    }

    async execute(name, email, password) {
        const validationResult = await this.#validator.execute(name, email, password);
        if (validationResult.hasErrors) {
            return validationResult.errors.map((error) => error.message);
        }

        const newUser = new UserEntity({ name, email, password });
        return await this.#repository.save(newUser);
    }
}

import { UserEntity } from "../../entities/user.entity.js";
import { CreateUserValidator } from "../../validators/user/create-user.validator.js";
import bcrypt from "bcrypt";
import { UserDTO } from "../../dtos/user.dto.js";
export class CreateUserUseCase {
    #repository;
    #validator;

    constructor(userRepository) {
        this.#repository = userRepository;
        this.#validator = new CreateUserValidator(this.#repository);
    }

    async execute(name, email, password) {
        const validationResult = await this.#validator.execute(name, email, password);
        if (validationResult.hasErrors()) {
            return validationResult.errors.map(({ message }) => message);
        }

        const encryptedPasword = bcrypt.hashSync(password, 10);

        const newUser = new UserEntity({ name, email, password: encryptedPasword });
        const createdUser = await this.#repository.save(newUser);
        return new UserDTO(createdUser);
    }
}

import { UserDTO } from "../../dtos/user.dto.js";
import { FindByIdUserValidator } from "../../validators/user/find-by-id-user.validator.js";

export class FindByIdUserUseCase {
    #repository;
    #validator;
    constructor(userRepository) {
        this.#repository = userRepository;
        this.#validator = new FindByIdUserValidator(this.#repository);
    }

    async execute(userId) {
        const validationResult = await this.#validator.execute(userId);

        if (validationResult.hasErrors()) {
            return validationResult.errors;
        }

        const foundUser = await this.#repository.findById(userId);
        return new UserDTO(foundUser);
    }
}

import { UpdateUserValidator } from "../../validators/user/update-user.validator.js";
import bcrypt from "bcrypt";
import { UserDTO } from "../../dtos/user.dto.js";
export class UpdateUserUseCase {
    #repository;
    #validator;

    constructor(userRepository) {
        this.#repository = userRepository;
        this.#validator = new UpdateUserValidator(this.#repository);
    }

    async execute(userId, updateInfo) {
        const validationResult = await this.#validator.execute(userId, updateInfo);
        if (validationResult.hasErrors()) {
            return validationResult.errors.map(({ message }) => message);
        }

        if (updateInfo.password) {
            updateInfo.password = bcrypt.hashSync(updateInfo.password, 10);
        }

        const updatedUser = await this.#repository.updateOne(userId, updateInfo);
        return new UserDTO(updatedUser);
    }
}

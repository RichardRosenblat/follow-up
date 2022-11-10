import { UuidManager } from "../../infra/uuidManager.js";
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
            return validationResult.errors.map(({ message }) => message);
        }

        return await this.#repository.findFirst({ _id: UuidManager.getUuid(userId) });
    }
}

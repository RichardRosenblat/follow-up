import { ValidationResultDTO } from "../../dtos/validationResult.dto.js";
import { isValidId } from "../../infra/idManager.js";

export class DeleteUserValidator {
    #repository;
    #validations;

    constructor(userRepository) {
        this.#repository = userRepository;
        this.#validations = [
            {
                predicate: async (userId) => !isValidId(userId),
                field: "userId",
                message: "Id must be a valid ObjectId",
            },
            {
                predicate: async (userId) =>
                    isValidId(userId) && !(await this.#repository.exists(userId)),
                field: "userId",
                message: "Id must exist in database",
            },
        ];
    }

    async execute(userId) {
        const validationResult = new ValidationResultDTO({ userId });

        if (!userId) {
            validationResult.addError({ field: "userId", message: "Id must be defined" });
        } else {
            for (let index = 0; index < this.#validations.length; index++) {
                const validator = this.#validations[index];

                if (await validator.predicate(userId)) {
                    validationResult.addError({
                        field: validator.field,
                        message: validator.message,
                    });
                }
            }
        }

        return validationResult;
    }
}

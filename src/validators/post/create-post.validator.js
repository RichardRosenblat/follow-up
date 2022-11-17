import validator from "validator";
import { ValidationResultDTO } from "../../dtos/validationResult.dto.js";
import { isValidId } from "../../infra/idManager.js";

export class CreatePostValidator {
    #postRepository;
    #validations;

    constructor(postRepository) {
        this.#postRepository = postRepository;
        this.#validations = [
            {
                predicate: async ({ text }) => validator.isEmpty(text),
                field: "text",
                message: "Text cannot be empty",
            },
            {
                predicate: async ({ author_id }) => !isValidId(author_id),
                field: "author_id",
                message: "Author id must be a valid ObjectId",
            },
            {
                predicate: async ({ author_id }) =>
                    isValidId(author_id) && !(await this.#postRepository.doesUserExists(author_id)),
                field: "author_id",
                message: "Author id must exist in database",
            },
        ];
    }

    async execute(text, author_id) {
        const validationResult = new ValidationResultDTO({ text, author_id });

        for (let index = 0; index < this.#validations.length; index++) {
            const validator = this.#validations[index];
            if (await validator.predicate({ text, author_id })) {
                validationResult.addError({ field: validator.field, message: validator.message });
            }
        }

        return validationResult;
    }
}

import validator from "validator";
import { ValidationResultDTO } from "../../dtos/validationResult.dto.js";

export class CreateUserValidator {
    #repository;
    #validations;

    constructor(userRepository) {
        this.#repository = userRepository;
        this.#validations = [
            {
                predicate: ({ name }) => validator.isEmpty(name),
                field: "name",
                message: "Name cannot be empty",
            },
            {
                predicate: ({ password }) => validator.isEmpty(password),
                field: "password",
                message: "Password cannot be empty",
            },
            {
                predicate: ({ password }) => !validator.isLength(password, { min: 8 }),
                field: "password",
                message: "Password must be minimum 8 caracters",
            },
            {
                predicate: ({ email }) => !validator.isEmail(email),
                field: "email",
                message: "Email must be a valid email adress",
            },
            {
                predicate: async ({ email }) => await this.#repository.doesEmailAlreadyExist(email),
                field: "email",
                message: "Email must be unique",
            },
        ];
    }

    async execute(name, email, password) {
        const validationResult = new ValidationResultDTO({ name, email, password });

        for (let index = 0; index < this.#validations.length; index++) {
            const validator = this.#validations[index];
            if (await validator.predicate({ name, email, password })) {
                validationResult.addError({ field: validator.field, message: validator.message });
            }
        }

        return validationResult;
    }
}

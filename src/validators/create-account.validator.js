import validator from "validator";
import { ValidationResultDTO } from "../dtos/validationResult.dto.js";

export class CreateAccountValidator {
    #repository;
    #validations;

    constructor(accountRepository) {
        this.#repository = accountRepository;
        this.#validations = [
            {
                validation: ({ name }) => validator.isEmpty(name),
                field: "name",
                message: "Name cannot be empty",
            },
            {
                validation: ({ password }) => validator.isEmpty(password),
                field: "password",
                message: "Password cannot be empty",
            },
            {
                validation: ({ password }) => !validator.isLength(password, { min: 8 }),
                field: "password",
                message: "Password must be minimum 8 caracters",
            },
            {
                validation: ({ email }) => !validator.isEmail(email),
                field: "email",
                message: "Email must be a valid email adress",
            },
            {
                validation: ({ email }) => this.#repository.doesEmailAlreadyExist(email),
                field: "email",
                message: "Email must be unique",
            },
        ];
    }

    execute(name, email, password) {
        const validationResult = new ValidationResultDTO({ name, email, password });

        this.#validations.forEach((validator) => {
            if (validator.validation({ name, email, password })) {
                validationResult.addError({ field: validator.field, message: validator.message });
            }
        });

        return validationResult;
    }
}

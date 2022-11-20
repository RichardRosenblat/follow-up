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
        const fields = { name, email, password };
        const validationResult = new ValidationResultDTO(fields);

        if (this.#hasNotDefinedRequiredFields(fields)) {
            this.#addRequiredFieldsErrors(validationResult, fields);
        } else {
            for (let index = 0; index < this.#validations.length; index++) {
                const validator = this.#validations[index];
                if (await validator.predicate(fields)) {
                    validationResult.addError({
                        field: validator.field,
                        message: validator.message,
                    });
                }
            }
        }

        return validationResult;
    }

    #addRequiredFieldsErrors(validationResult, fields) {
        fields.name ||
            validationResult.addError({
                field: "name",
                message: "name must be defined",
            });
        fields.email ||
            validationResult.addError({
                field: "email",
                message: "email must be defined",
            });
        fields.password ||
            validationResult.addError({
                field: "password",
                message: "password must be defined",
            });
    }

    #hasNotDefinedRequiredFields({ name, email, password }) {
        return (!email && email !== "") || (!name && name !== "") || (!password && password !== "");
    }
}

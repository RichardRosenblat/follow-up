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

		for (let index = 0; index < this.#validations.length; index++) {
			const validator = this.#validations[index];

			if (!fields[validator.field] && fields[validator.field] !== "") {
				validationResult.addError({
					field: validator.field,
					message: `${validator.field.charAt(0).toUpperCase() + validator.field.slice(1)} must be defined`,
				});
				continue;
			}
			if (await validator.predicate(fields)) {
				validationResult.addError({
					field: validator.field,
					message: validator.message,
				});
			}
		}

		return validationResult;
	}
}

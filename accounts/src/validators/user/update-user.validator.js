import validator from "validator";
import { ValidationResultDTO } from "../../dtos/validationResult.dto.js";
import { isValidId } from "../../infra/idManager.js";

export class UpdateUserValidator {
	#repository;
	#idValidations;
	#updateInfoValidations;
	constructor(userRepository) {
		this.#repository = userRepository;
		this.#idValidations = [
			{
				predicate: async (userId) => !isValidId(userId),
				field: "id",
				message: "Id must be a valid ObjectId",
			},
			{
				predicate: async (userId) => isValidId(userId) && !(await this.#repository.exists(userId)),
				field: "id",
				message: "Id must exist in database",
			},
		];
		this.#updateInfoValidations = {
			name: [
				{
					predicate: (name) => validator.isEmpty(name),
					field: "name",
					message: "Name cannot be empty",
				},
			],
			email: [
				{
					predicate: (email) => !validator.isEmail(email),
					field: "email",
					message: "Email must be a valid email adress",
				},
				{
					predicate: async (email) => await this.#repository.doesEmailAlreadyExist(email),
					field: "email",
					message: "Email must be unique",
				},
			],
			password: [
				{
					predicate: (password) => validator.isEmpty(password),
					field: "password",
					message: "Password cannot be empty",
				},
				{
					predicate: (password) => !validator.isLength(password, { min: 8 }),
					field: "password",
					message: "Password must be minimum 8 caracters",
				},
			],
		};
	}

	async execute(userId, updateInfo) {
		const validationResult = new ValidationResultDTO({ userId, updateInfo });

		await this.#validateId(userId, validationResult);
		await this.#validateUpdateInfo(updateInfo, validationResult);

		return validationResult;
	}

	async #validateId(userId, validationResult) {
		if (!userId) {
			validationResult.addError({ field: "id", message: "Id must be defined" });
			return;
		}

		await this.#runValidations(userId, validationResult, this.#idValidations);
	}

	async #validateUpdateInfo(updateInfo, validationResult) {
		if (!(updateInfo.name || updateInfo.email || updateInfo.password)) {
			validationResult.addError({
				field: "Name, email, password",
				message: "Name, email or password must be defined",
			});
			return;
		}
		if (updateInfo.name || updateInfo.name === "") {
			await this.#runValidations(updateInfo.name, validationResult, this.#updateInfoValidations.name);
		}
		if (updateInfo.email || updateInfo.email === "") {
			await this.#runValidations(updateInfo.email, validationResult, this.#updateInfoValidations.email);
		}
		if (updateInfo.password || updateInfo.password === "") {
			await this.#runValidations(updateInfo.password, validationResult, this.#updateInfoValidations.password);
		}
	}

	async #runValidations(dataToValidate, validationResult, validationsArray) {
		for (let index = 0; index < validationsArray.length; index++) {
			const validator = validationsArray[index];
			if (await validator.predicate(dataToValidate)) {
				validationResult.addError({
					field: validator.field,
					message: validator.message,
				});
			}
		}
	}
}

import { ObjectId } from "mongodb";
import validator from "validator";
import { ValidationResultDTO } from "../dtos/validationResult.dto.js";

export class CreatePostValidator {
	#userRepository;
	#validations;

	constructor(userRepository) {
		this.#userRepository = userRepository;
		this.#validations = [
			{
				predicate: ({ text }) => validator.isEmpty(text),
				field: "text",
				message: "Text cannot be empty",
			},
			{
				predicate: ({ author_id }) => !ObjectId.isValid(author_id),
				field: "author_id",
				message: "Author id must be a valid ObjectId",
			},
			{
				predicate: async ({ author_id }) =>
					ObjectId.isValid(author_id) &&
					!(await this.#userRepository.findFirst({ _id: new ObjectId(author_id) })),
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

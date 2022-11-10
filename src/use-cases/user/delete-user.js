import { DeleteUserValidator } from "../../validators/user/delete-user.validator.js";

export class DeleteUserUseCase {
	#repository;
	#validator;
	constructor(userRepository) {
		this.#repository = userRepository;
		this.#validator = new DeleteUserValidator(this.#repository);
	}

	async execute(userId) {
		const validationResult = await this.#validator.execute(userId);

		if (validationResult.hasErrors()) {
			return validationResult.errors.map(({ message }) => message);
		}

		return await this.#repository.deleteOne(userId);
	}
}

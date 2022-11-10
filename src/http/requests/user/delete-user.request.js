export class DeleteUserRequest {
	#deleteUserUseCase;

	constructor(deleteUserUseCase) {
		this.#deleteUserUseCase = deleteUserUseCase;
	}

	async execute(req, res) {
		const { id } = req.params;
		const deleteUserResult = await this.#deleteUserUseCase.execute(id);

		if (Array.isArray(deleteUserResult)) {
			res.status(404).send(deleteUserResult);
		} else {
			res.status(201).send();
		}
	}
}

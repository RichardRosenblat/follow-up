export class ListAllUserRequest {
	#listAllUserCase;

	constructor(listAllUserCase) {
		this.#listAllUserCase = listAllUserCase;
	}

	async execute(_req, res) {
		const allUsers = await this.#listAllUserCase.execute();

		res.status(200).send(allUsers.map((user) => user.toLiteral()));
	}
}

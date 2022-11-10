export class CreateUserRequest {
	#createUserUseCase;

	constructor(createUserUseCase) {
		this.#createUserUseCase = createUserUseCase;
	}

	async execute(req, res) {
		const { name, email, password } = req.body;
		const createUserResult = await this.#createUserUseCase.execute(name, email, password);

		if (Array.isArray(createUserResult)) {
			res.status(400).send(createUserResult);
		} else {
			res.status(201).send(createUserResult.toLiteral());
		}
	}
}
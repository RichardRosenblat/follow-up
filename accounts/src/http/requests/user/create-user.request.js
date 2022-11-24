export class CreateUserRequest {
    #createUserUseCase;

    constructor(createUserUseCase) {
        this.#createUserUseCase = createUserUseCase;
    }

    async execute(req, res) {
        try {
            const { name, email, password } = req.body;
            const createUserResult = await this.#createUserUseCase.execute(name, email, password);

            if (Array.isArray(createUserResult)) {
                return res.status(400).json(createUserResult);
            }
            return res.status(201).json(createUserResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error", message: error.message });
        }
    }
}

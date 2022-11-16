export class UpdateUserRequest {
    #updateUserUseCase;

    constructor(updateUserUseCase) {
        this.#updateUserUseCase = updateUserUseCase;
    }

    async execute(req, res) {
        try {
            const { id } = req.params;
            const updateInfo = req.body;
            const updateUserResult = await this.#updateUserUseCase.execute(id, updateInfo);

            if (Array.isArray(updateUserResult)) {
                return res.status(400).send(updateUserResult);
            }
            return res.status(201).send(updateUserResult);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error", message: error.message });
        }
    }
}

export class FindByIdUserRequest {
    #findByIdUserUseCase;

    constructor(findByIdUserUseCase) {
        this.#findByIdUserUseCase = findByIdUserUseCase;
    }

    async execute(req, res) {
        try {
            const { id } = req.params;
            const findByIdUserResult = await this.#findByIdUserUseCase.execute(id);

            if (Array.isArray(findByIdUserResult)) {
                return res.status(404).json(findByIdUserResult);
            }
            return res.status(200).json(findByIdUserResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error", message: error.message });
        }
    }
}

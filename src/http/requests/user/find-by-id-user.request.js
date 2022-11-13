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
                res.status(404).send(findByIdUserResult);
            } else {
                res.status(200).send(findByIdUserResult.toLiteral());
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error", message: error.message });
        }
    }
}

export class DeleteUserRequest {
    #deleteUserUseCase;

    constructor(deleteUserUseCase) {
        this.#deleteUserUseCase = deleteUserUseCase;
    }

    async execute(req, res) {
        try {
            const { id } = req.params;
            const deleteUserResult = await this.#deleteUserUseCase.execute(id);

            if (Array.isArray(deleteUserResult)) {
                return res.status(404).json(deleteUserResult);
            }
            return res.status(204).json();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error", message: error.message });
        }
    }
}

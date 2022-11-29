export class ListAllUserRequest {
    #listAllUserCase;

    constructor(listAllUserCase) {
        this.#listAllUserCase = listAllUserCase;
    }

    async execute(_req, res) {
        try {
            const allUsers = await this.#listAllUserCase.execute();
            res.status(200).json(allUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error", message: error.message });
        }
    }
}

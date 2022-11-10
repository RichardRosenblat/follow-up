

export class ListAllUserUseCase {
    #repository;

    constructor(userRepository) {
        this.#repository = userRepository;
    }

    async execute() {
        return await this.#repository.listAll();
    }
}

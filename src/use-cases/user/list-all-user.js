import { UserDTO } from "../../dtos/user.dto.js";

export class ListAllUserUseCase {
    #repository;

    constructor(userRepository) {
        this.#repository = userRepository;
    }

    async execute() {
        const allUsers = await this.#repository.listAll();
        return allUsers.map((userEntity) => new UserDTO(userEntity));
    }
}

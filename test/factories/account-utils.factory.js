import { AccountRepository } from "../../src/repository/account.repository.js";
import { CreateUserUseCase } from "../../src/use-cases/create-user.js";

export function getAccountRepositoryAndUseCase() {
    const repository = new AccountRepository();
    const useCase = new CreateUserUseCase(repository);

    return {repository, useCase};
}

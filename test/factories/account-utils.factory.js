import { AccountRepository } from "../../src/repository/account.repository.js";
import { CreateUserUseCase } from "../../src/use-cases/create-user.js";

export class AccountUtilsFactory{
    static getAccountRepositoryAndCreateUser() {
        const repository = new AccountRepository();
        const createUser = new CreateUserUseCase(repository);
    
        return {repository, createUser};
    }
}

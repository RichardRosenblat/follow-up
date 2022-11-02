import { UserRepository } from "../../src/repository/user.repository.js";
import { CreateUserUseCase } from "../../src/use-cases/create-user.js";

export class UserUtilsFactory{
    static getUserRepositoryAndCreateUser() {
        const repository = new UserRepository();
        const createUser = new CreateUserUseCase(repository);
    
        return {repository, createUser};
    }
}

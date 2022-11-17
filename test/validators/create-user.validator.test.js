import { beforeEach, jest, it, expect } from "@jest/globals";
import { ValidationResultDTO } from "../../src/dtos/validationResult.dto";
import { UserRepository } from "../../src/repository/user.repository";
import { CreateUserValidator } from "../../src/validators/user/create-user.validator";

let mockUserRepository =  new UserRepository({});
beforeEach(() => {
    mockUserRepository.doesEmailAlreadyExist = jest.fn(async (email) =>
        email === "exists@gmail.com" ? true : false
    );
});

describe("Testing validations of user creation", () => {
    const validator = new CreateUserValidator(mockUserRepository)
    it("Must return validation Object", async () => { 
        const validationResult = await validator.execute('Jhonn','doesNotExists@gmail.com','1234567890')
        expect(validationResult).toBeInstanceOf(ValidationResultDTO);
    });
    it("Must return validation Object with no errors if fields are valid", async () => { 
        const validationResult = await validator.execute('Jhonn','doesNotExists@gmail.com','1234567890')
        expect(validationResult.errors).toHaveLength(0)
        expect(validationResult.hasErrors()).toBe(false)
    });
    it("Must return validation Object with errors if fields are not valid", async () => { 
        const validationResult = await validator.execute('Jhonn','exists@gmail.com','1234567890')
        expect(validationResult.errors).not.toHaveLength(0)
        expect(validationResult.hasErrors()).toBe(true)
    });
});

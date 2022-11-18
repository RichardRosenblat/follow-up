import { beforeEach, jest, it, expect } from "@jest/globals";
import { ValidationResultDTO } from "../../src/dtos/validationResult.dto";
import { UserRepository } from "../../src/repository/user.repository";
import { CreateUserValidator } from "../../src/validators/user/create-user.validator";

let mockUserRepository = new UserRepository({});
beforeEach(() => {
	mockUserRepository.doesEmailAlreadyExist = jest.fn(async (email) => (email === "exists@gmail.com" ? true : false));
});

describe("Validations of user creation", () => {
	const validator = new CreateUserValidator(mockUserRepository);
	it("Should return validation Object", async () => {
		const validationResult = await validator.execute("Jhonn", "doesNotExists@gmail.com", "1234567890");
		expect(validationResult).toBeInstanceOf(ValidationResultDTO);
	});

	it("Should return validation Object with no errors when input is valid", async () => {
		const validationResult = await validator.execute("Jhonn", "doesNotExists@gmail.com", "1234567890");
		expect(validationResult.errors).toHaveLength(0);
		expect(validationResult.hasErrors()).toBe(false);
	});

	it("Should return validation Object with errors when input is invalid", async () => {
		const validationResult = await validator.execute("Jhonn", "exists@gmail.com", "1234567890");
		expect(validationResult.errors).not.toHaveLength(0);
		expect(validationResult.hasErrors()).toBe(true);
	});

	it("Should return validation Object with errors that contain a field and a message when input is invalid", async () => {
		const validationResult = await validator.execute("", "notemail", "1234");
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([
				{ field: "name", message: "Name cannot be empty" },
				{ field: "password", message: "Password must be minimum 8 caracters" },
				{ field: "email", message: "Email must be a valid email adress" },
			])
		);
	});
});

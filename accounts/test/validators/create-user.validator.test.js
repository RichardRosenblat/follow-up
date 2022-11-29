import { ValidationResultDTO } from "../../src/dtos/validationResult.dto";
import { UserRepository } from "../../src/repository/user.repository";
import { CreateUserValidator } from "../../src/validators/user/create-user.validator";

let mockUserRepository = new UserRepository({});
beforeEach(() => {
	mockUserRepository.doesEmailAlreadyExist = jest.fn(async (email) => email === "exists@gmail.com");
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
		expect(validationResult.data).toStrictEqual({
			name: "Jhonn",
			email: "doesNotExists@gmail.com",
			password: "1234567890",
		});
	});

	it("Should return validation Object with errors when input is invalid", async () => {
		const validationResult = await validator.execute("Jhonn", "exists@gmail.com", "1234567890");
		expect(validationResult.errors).not.toHaveLength(0);
		expect(validationResult.hasErrors()).toBe(true);
	});

	it("Should return validation Object with errors that contain a field and a message when input is invalid", async () => {
		const validationResult = await validator.execute("", "notemail", "");

		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([
				expect.objectContaining({ field: expect.any(String), message: expect.any(String) }),
			])
		);
	});
	it("Should return validation Object with errors that when name is empty", async () => {
		const validationResult = await validator.execute("", "doesNotExist@gmail.com", "123456789");
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "name", message: "Name cannot be empty" }])
		);
	});
	it("Should return validation Object with errors that when email is not an valid email string", async () => {
		const validationResult = await validator.execute("Name", "notemail", "123456789");
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "email", message: "Email must be a valid email adress" }])
		);
	});
	it("Should return validation Object with errors that when email exists", async () => {
		const validationResult = await validator.execute("Name", "exists@gmail.com", "123456789");
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "email", message: "Email must be unique" }])
		);
	});
	it("Should return validation Object with errors that when password is too short", async () => {
		const validationResult = await validator.execute("Name", "exists@gmail.com", "012");
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "password", message: "Password must be minimum 8 caracters" }])
		);
	});
	it("Should return validation Object with errors that when password is empty", async () => {
		const validationResult = await validator.execute("Name", "doesNotExist@gmail.com", "");
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "password", message: "Password cannot be empty" }])
		);
	});
	it("Should return validation Object with multiple errors that when name is undefined", async () => {
		const validationResult = await validator.execute(undefined, "notExists@gmail.com", "123456789");
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "name", message: "Name must be defined" }])
		);
	});
	it("Should return validation Object with multiple errors that when email is undefined", async () => {
		const validationResult = await validator.execute("name", undefined, "123456789");
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "email", message: "Email must be defined" }])
		);
	});
	it("Should return validation Object with multiple errors that when email is undefined", async () => {
		const validationResult = await validator.execute("name", "doesNotExists@gmail.com", undefined);
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "password", message: "Password must be defined" }])
		);
	});
	it("Should return validation Object with multiple errors that when multiple inputs are invalid", async () => {
		const validationResult = await validator.execute("", "notemail", "");
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([
				{ field: "name", message: "Name cannot be empty" },
				{ field: "password", message: "Password cannot be empty" },
				{ field: "password", message: "Password must be minimum 8 caracters" },
				{ field: "email", message: "Email must be a valid email adress" },
			])
		);
	});
});

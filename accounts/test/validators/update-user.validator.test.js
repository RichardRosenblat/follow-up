import { ValidationResultDTO } from "../../src/dtos/validationResult.dto";
import { getId } from "../../src/infra/idManager";
import { UserRepository } from "../../src/repository/user.repository";
import { UpdateUserValidator } from "../../src/validators/user/update-user.validator";

let mockUserRepository = new UserRepository({});
let existingId = getId().toHexString();
let notExistingId = getId().toHexString();

beforeEach(() => {
	mockUserRepository.doesEmailAlreadyExist = jest.fn(async (email) => email === "exists@gmail.com");
	mockUserRepository.exists = jest.fn(async (id) => id === existingId);
});

describe("Validations of user update", () => {
	const validator = new UpdateUserValidator(mockUserRepository);
	it("Should return validation Object", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "Jhonn",
			email: "doesNotExists@gmail.com",
			password: "1234567890",
		});
		expect(validationResult).toBeInstanceOf(ValidationResultDTO);
	});

	it("Should return validation Object with no errors when input is valid", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "Jhonn",
			email: "doesNotExists@gmail.com",
			password: "1234567890",
		});
		expect(validationResult.errors).toHaveLength(0);
		expect(validationResult.hasErrors()).toBe(false);
		expect(validationResult.data).toStrictEqual({
			updateInfo: {
				email: "doesNotExists@gmail.com",
				name: "Jhonn",
				password: "1234567890",
			},
			userId: existingId,
		});
	});

	it("Should return validation Object with errors when input is invalid", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "Jhonn",
			email: "exists@gmail.com",
			password: "1234567890",
		});
		expect(validationResult.errors).not.toHaveLength(0);
		expect(validationResult.hasErrors()).toBe(true);
	});

	it("Should return validation Object with errors that contain a field and a message when input is invalid", async () => {
		const validationResult = await validator.execute(notExistingId, {
			name: "",
			email: "notemail.com",
			password: "",
		});

		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([
				expect.objectContaining({ field: expect.any(String), message: expect.any(String) }),
			])
		);
	});
	it("Should return validation Object with errors that contain a field and a message when input is not defined", async () => {
		const validationResult = await validator.execute(undefined, {
			email: "doesNotExists@gmail.com",
			name: "Jhonn",
			password: "1234567890",
		});
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "id", message: "Id must be defined" }])
		);
	});
	it("Should return validation Object with errors that contain a field and a message when input is not an Id", async () => {
		const validationResult = await validator.execute("foobar", {
			email: "doesNotExists@gmail.com",
			name: "Jhonn",
			password: "1234567890",
		});
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "id", message: "Id must be a valid ObjectId" }])
		);
	});
	it("Should return validation Object with errors that contain a field and a message when input is an Id that does not exist", async () => {
		const validationResult = await validator.execute(notExistingId, {
			email: "doesNotExists@gmail.com",
			name: "Jhonn",
			password: "1234567890",
		});
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "id", message: "Id must exist in database" }])
		);
	});
	it("Should return validation Object with errors that when name is empty", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "",
			email: "doesNotExist@gmail.com",
			password: "123456789",
		});
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "name", message: "Name cannot be empty" }])
		);
	});
	it("Should return validation Object with errors that when email is not an valid email string", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "Name",
			email: "notemail",
			password: "123456789",
		});
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "email", message: "Email must be a valid email adress" }])
		);
	});
	it("Should return validation Object with errors that when email exists", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "Name",
			email: "exists@gmail.com",
			password: "123456789",
		});
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "email", message: "Email must be unique" }])
		);
	});
	it("Should return validation Object with errors that when password is too short", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "Name",
			email: "exists@gmail.com",
			password: "012",
		});
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "password", message: "Password must be minimum 8 caracters" }])
		);
	});
	it("Should return validation Object with errors that when password is empty", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "Name",
			email: "doesNotExist@gmail.com",
			password: "",
		});
		expect(validationResult.hasErrors()).toBe(true);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "password", message: "Password cannot be empty" }])
		);
	});
	it("Should not return validation Object with multiple errors that when name is undefined", async () => {
		const validationResult = await validator.execute(existingId, {
			name: undefined,
			email: "notExists@gmail.com",
			password: "123456789",
		});
		expect(validationResult.hasErrors()).toBe(false);
		expect(validationResult.errors).not.toStrictEqual(
			expect.arrayContaining([{ field: "name", message: "Name must be defined" }])
		);
	});
	it("Should not return validation Object with multiple errors that when email is undefined", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "name",
			email: undefined,
			password: "123456789",
		});
		expect(validationResult.hasErrors()).toBe(false);
		expect(validationResult.errors).not.toStrictEqual(
			expect.arrayContaining([{ field: "email", message: "Email must be defined" }])
		);
	});
	it("Should not return validation Object with multiple errors that when email is undefined", async () => {
		const validationResult = await validator.execute(existingId, {
			name: "name",
			email: "doesNotExists@gmail.com",
			password: undefined,
		});
		expect(validationResult.hasErrors()).toBe(false);
		expect(validationResult.errors).not.toStrictEqual(
			expect.arrayContaining([{ field: "password", message: "Password must be defined" }])
		);
	});
	it("Should return validation Object with multiple errors that when multiple inputs are invalid", async () => {
		const validationResult = await validator.execute(existingId, { name: "", email: "notemail", password: "" });
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

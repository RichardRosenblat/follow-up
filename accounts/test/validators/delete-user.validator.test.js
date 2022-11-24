import { ValidationResultDTO } from "../../src/dtos/validationResult.dto";
import { getId } from "../../src/infra/idManager";
import { UserRepository } from "../../src/repository/user.repository";
import { DeleteUserValidator } from "../../src/validators/user/delete-user.validator";

let mockUserRepository = new UserRepository({});
let existingId = getId().toHexString();
let notExistingId = getId().toHexString();
beforeEach(() => {
	mockUserRepository.exists = jest.fn(async (id) => id === existingId);
});

describe("Validations of user deletion", () => {
	const validator = new DeleteUserValidator(mockUserRepository);
	it("Should return validation Object", async () => {
		const validationResult = await validator.execute(existingId);
		expect(validationResult).toBeInstanceOf(ValidationResultDTO);
		expect(validationResult.data).toStrictEqual({
			userId: existingId,
		});
	});

	it("Should return validation Object with no errors when input is valid", async () => {
		const validationResult = await validator.execute(existingId);
		expect(validationResult.errors).toHaveLength(0);
		expect(validationResult.hasErrors()).toBe(false);
	});

	it("Should return validation Object with errors when input is invalid", async () => {
		const validationResult = await validator.execute(notExistingId);
		expect(validationResult.errors).not.toHaveLength(0);
		expect(validationResult.hasErrors()).toBe(true);
	});

	it("Should return validation Object with errors that contain a field and a message when input is not defined", async () => {
		const validationResult = await validator.execute(undefined);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "id", message: "Id must be defined" }])
		);
	});
	it("Should return validation Object with errors that contain a field and a message when input is not an Id", async () => {
		const validationResult = await validator.execute("foobar");
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "id", message: "Id must be a valid ObjectId" }])
		);
	});
	it("Should return validation Object with errors that contain a field and a message when input is an Id that does not exist", async () => {
		const validationResult = await validator.execute(notExistingId);
		expect(validationResult.errors).toStrictEqual(
			expect.arrayContaining([{ field: "id", message: "Id must exist in database" }])
		);
	});
});

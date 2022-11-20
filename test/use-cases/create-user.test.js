import { beforeEach, jest, it, expect } from "@jest/globals";
import { UserDTO } from "../../src/dtos/user.dto";
import { UserEntity } from "../../src/entities/user.entity";
import { UserRepository } from "../../src/repository/user.repository";
import { CreateUserUseCase } from "../../src/use-cases/user/create-user";

let mockUserRepository = new UserRepository({});
beforeEach(() => {
	mockUserRepository.doesEmailAlreadyExist = jest.fn(async (email) => (email === "exists@gmail.com" ? true : false));
	mockUserRepository.save = jest.fn(async (userEntity) => new UserEntity(userEntity.toLiteral()));
});

describe("Create user use case", () => {
	const createUser = new CreateUserUseCase(mockUserRepository);
	it("Should return an user DTO when input is valid", async () => {
		const user = await createUser.execute("foo", "noExists@gmail.com", "1234566789");
		expect(user).toBeInstanceOf(UserDTO);
	});
	it("Should return an array when input is invalid", async () => {
		const user = await createUser.execute("foo", "noExists@gmail.com", "123");
		expect(Array.isArray(user)).toBe(true);
	});
	it("Should return an array of errors when input is invalid", async () => {
		const user = await createUser.execute("foo", "noExists@gmail.com", "123");
		expect(Array.isArray(user)).toBe(true);
	});
	it("Should return an array of errors containing objects with field and message when input is invalid", async () => {
		const user = await createUser.execute("foo", "noExists@gmail.com", "123");
		expect(user).not.toHaveLength(0);
		expect(user).toStrictEqual(
			expect.arrayContaining([{ field: "password", message: "Password must be minimum 8 caracters" }])
		);
	});
	it("Should return an array of errors containing objects with field and message when input is undefined", async () => {
		const user = await createUser.execute();
		expect(user).not.toHaveLength(0);
		expect(user).toStrictEqual(
			expect.arrayContaining([
				{
					field: "name",
					message: "name must be defined",
				},
				{
					field: "email",
					message: "email must be defined",
				},
				{
					field: "password",
					message: "password must be defined",
				},
			])
		);
	});
});

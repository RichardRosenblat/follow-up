import { beforeAll, jest, it, expect, afterAll, describe } from "@jest/globals";
import { shutdown, start } from "../../src/http/server";
import { DatabaseConnections } from "../../src/infra/database-connections";
import { mockMongoDriver } from "../util/mongoDbDriverMock";
import request from "supertest";
import { getId } from "../../src/infra/idManager";

let app;
beforeAll(async () => {
	DatabaseConnections.connect = jest.fn(({ collection }) => {
		return mockMongoDriver(collection);
	});
	jest.spyOn(DatabaseConnections, "status", "get").mockReturnValue("Connected");
	app = await start(3000, { connectionString: "", databaseName: "" });

	// This line disables logs from the application to avoid pollution during testing
	console.log = () => {};
});
afterAll(async () => {
	await shutdown();
});

describe("Follow-up Server", () => {
	it("Should pass the health check", async () => {
		const response = await request(app).get("/").expect(200);
		expect(response.body).toStrictEqual({ Server: "ok", Database: "Connected" });
	});

	let userId;
	describe("POST /users", () => {
		it("Should create an user when the input is valid", async () => {
			const response = await request(app)
				.post("/users")
				.send({
					name: "Richard Rosenblat",
					email: "imadethis@cOode.com",
					password: "0123456798",
				})
				.expect(201);
			userId = response.body.id;
		});
		it("Should return an array with errors when the input is not valid", async () => {
			const response = await request(app)
				.post("/users")
				.send({
					name: "",
					email: "dsawf",
					password: "01",
				})
				.expect(400);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body).toStrictEqual([
				{ field: "name", message: "Name cannot be empty" },
				{
					field: "password",
					message: "Password must be minimum 8 caracters",
				},
				{ field: "email", message: "Email must be a valid email adress" },
			]);
		});
	});
	describe("GET /users", () => {
		it("Should return an array with the created users", async () => {
			const response = await request(app).get("/users").expect(200);

			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body[0]).toStrictEqual(
				expect.objectContaining({
					id: expect.any(String),
					creationDate: expect.any(String),
					password: expect.any(String),
					posts: [],
					name: "Richard Rosenblat",
					email: "imadethis@cOode.com",
				})
			);
		});
	});
	describe("GET /users/:id", () => {
		it("Should return an user by id", async () => {
			const response = await request(app).get(`/users/${userId}`).expect(200);

			expect(response.body).toStrictEqual(
				expect.objectContaining({
					id: expect.any(String),
					creationDate: expect.any(String),
					password: expect.any(String),
					posts: [],
					name: "Richard Rosenblat",
					email: "imadethis@cOode.com",
				})
			);
		});
		it("Should return an array with errors when the id is not valid", async () => {
			const response = await request(app).get(`/users/${getId()}`).expect(404);

			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body).toStrictEqual([{ field: "id", message: "Id must exist in database" }]);
		});
	});
	describe("PUT /users/:id", () => {
		it.each([
			[
				"name",
				{
					name: "Jhonn doe",
				},
			],
			[
				"email",
				{
					email: "foo@email.com",
				},
			],
			[
				"password",
				{
					password: "foobarfoo",
				},
			],
			[
				"name, email and password",
				{
					name: "Talbnesor Drahcir",
					email: "this@email.com",
					password: "5555555555",
				},
			],
		])("Should update an user's %s by id", async (_field, updateParams) => {
			const response = await request(app).put(`/users/${userId}`).send(updateParams).expect(201);

			expect(response.body).toStrictEqual(
				expect.objectContaining({
					id: expect.any(String),
					creationDate: expect.any(String),
					posts: [],
					name: expect.any(String),
					email: expect.any(String),
					...updateParams,
					password: expect.any(String),
				})
			);
		});
		it("Should return an array with errors when the id is not valid", async () => {
			const response = await request(app)
				.put(`/users/${getId()}`)
				.send({
					name: "Talbnesor Drahcir",
					email: "thisIsAn@email.com",
					password: "5555555555",
				})
				.expect(400);

			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body).toStrictEqual([{ field: "id", message: "Id must exist in database" }]);
		});
		it("Should return an array with errors when no fields are given", async () => {
			const response = await request(app).put(`/users/${userId}`).expect(400);

			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body).toStrictEqual([
				{
					field: "Name, email, password",
					message: "Name, email or password must be defined",
				},
			]);
		});
		it("Should return an array with errors when fields are invalid", async () => {
			const response = await request(app)
				.put(`/users/${userId}`)
				.send({
					email: "dsawf",
					password: "01",
				})
				.expect(400);

			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body).toStrictEqual([
				{
					field: "email",
					message: "Email must be a valid email adress",
				},
				{
					field: "password",
					message: "Password must be minimum 8 caracters",
				},
			]);
		});
	});
	describe("DELETE /users/:id", () => {
		it("Should return an user by id", async () => {
			await request(app).delete(`/users/${userId}`).expect(204);
		});
		it("Should return an array with errors when the id is not valid", async () => {
			const response = await request(app).get(`/users/${getId()}`).expect(404);

			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body).toStrictEqual([{ field: "id", message: "Id must exist in database" }]);
		});
	});
});

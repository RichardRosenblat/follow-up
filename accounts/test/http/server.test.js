import { shutdown, start } from "../../src/http/server";
import { DatabaseConnections } from "../../src/infra/database-connections";
import { mockMongoDriver, disableMock, enableMock, isDisabled } from "../util/mongoDbDriverMock";
import request from "supertest";
import randomEmail from "random-email";
import { getId } from "../../src/infra/idManager";

let app;
let closeServerSpy;
beforeAll(async () => {
    DatabaseConnections.connect = jest.fn(({ collection }) => {
        enableMock();
        return mockMongoDriver(collection);
    });
    DatabaseConnections.disconnect = jest.fn(() => {
        disableMock();
    });
    jest.spyOn(DatabaseConnections, "status", "get").mockImplementation(() => {
        if (isDisabled) {
            return "Disconnected";
        }
        return "Connected";
    });

    app = await start(3000, { connectionString: "", databaseName: "" });
    closeServerSpy = jest.spyOn(app, "close");
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(async () => {
    await shutdown();
});
beforeEach(() => enableMock());

describe("Follow-up Server", () => {
    describe("Health check", () => {
        it("health check should return ok and connected if database is connected", async () => {
            const response = await request(app).get("/").expect(200);
            expect(response.body).toStrictEqual({ Server: "ok", Database: "Connected" });
        });
        it("health check should return ok and disconnected if database is not connected", async () => {
            disableMock();
            const response = await request(app).get("/").expect(200);
            expect(response.body).toStrictEqual({ Server: "ok", Database: "Disconnected" });
        });
    });

    describe("POST /users", () => {
        it("Should create an user when the input is valid", async () => {
            const email = randomEmail();
            await request(app)
                .post("/users")
                .send({
                    name: "Richard Rosenblat",
                    email,
                    password: "0123456798",
                })
                .expect(201)
                .then((response) =>
                    expect(response.body).toStrictEqual(
                        expect.objectContaining({
                            id: expect.any(String),
                            creationDate: expect.any(String),
                            name: "Richard Rosenblat",
                            email,
                            password: expect.any(String),
                        })
                    )
                );
        });

        it("Should return an array with errors when name is empty", async () => {
            const response = await request(app)
                .post("/users")
                .send({
                    name: "",
                    email: randomEmail(),
                    password: "123456789",
                })
                .expect(400);
            expect(response.body).toStrictEqual([
                { field: "name", message: "Name cannot be empty" },
            ]);
        });
        it("Should return an array with errors when email is not valid", async () => {
            const response = await request(app)
                .post("/users")
                .send({
                    name: "Richard Rosenblat",
                    email: "bipipipopopo",
                    password: "123456789",
                })
                .expect(400);
            expect(response.body).toStrictEqual([
                { field: "email", message: "Email must be a valid email adress" },
            ]);
        });
        it("Should return an array with errors when email repeated", async () => {
            const { email } = await createUser();
            const response = await request(app)
                .post("/users")
                .send({
                    name: "Richard Rosenblat",
                    email: email,
                    password: "123456789",
                })
                .expect(400);
            expect(response.body).toStrictEqual([
                { field: "email", message: "Email must be unique" },
            ]);
        });
        it("Should return an array with errors when password is not valid", async () => {
            const response = await request(app)
                .post("/users")
                .send({
                    name: "Richard Rosenblat",
                    email: randomEmail(),
                    password: "01",
                })
                .expect(400);
            expect(response.body).toStrictEqual([
                {
                    field: "password",
                    message: "Password must be minimum 8 caracters",
                },
            ]);
        });
        it("Should return an array with errors when password is not valid", async () => {
            const response = await request(app)
                .post("/users")
                .send({
                    email: randomEmail(),
                    password: "123456789",
                })
                .expect(400);
            expect(response.body).toStrictEqual([
                {
                    field: "name",
                    message: "Name must be defined",
                },
            ]);
        });
        it("Should return an array with errors when password is not valid", async () => {
            const response = await request(app)
                .post("/users")
                .send({
                    name: "Richard Rosenblat",
                    password: "123456789",
                })
                .expect(400);
            expect(response.body).toStrictEqual([
                {
                    field: "email",
                    message: "Email must be defined",
                },
            ]);
        });
        it("Should return an array with errors when password is not valid", async () => {
            const response = await request(app)
                .post("/users")
                .send({
                    name: "Richard Rosenblat",
                    email: randomEmail(),
                })
                .expect(400);
            expect(response.body).toStrictEqual([
                {
                    field: "password",
                    message: "Password must be defined",
                },
            ]);
        });
        it("Should return an error 500 in case of an internal error", async () => {
            disableMock();
            await request(app)
                .post("/users")
                .send({
                    name: "Richard Rosenblat",
                    email: randomEmail(),
                    password: "0123456798",
                })
                .expect(500);
        });
    });
    describe("GET /users", () => {
        it("Should return an array with the created users", async () => {
            const createdUser = await createUser();
            const response = await request(app).get("/users").expect(200);

            expect(response.body).toStrictEqual(expect.arrayContaining([createdUser]));
        });
        it("Should return an error 500 in case of an internal error", async () => {
            disableMock();
            await request(app).get("/users").expect(500);
        });
    });
    describe("GET /users/:id", () => {
        it("Should return an user by id", async () => {
            const createdUser = await createUser();
            const response = await request(app).get(`/users/${createdUser.id}`).expect(200);

            expect(response.body).toStrictEqual(createdUser);
        });
        it("Should return an array with errors when the id is not valid", async () => {
            const response = await request(app).get(`/users/${getId()}`).expect(404);

            expect(response.body).toStrictEqual([
                { field: "id", message: "Id must exist in database" },
            ]);
        });
        it("Should return an error 500 in case of an internal error", async () => {
            disableMock();
            await request(app).get(`/users/${getId()}`).expect(500);
        });
    });
    describe("PUT /users/:id", () => {
        const updateCases = [
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
        ];
        let id;
        beforeAll(async () => {
            enableMock();
            id = (await createUser()).id;
        });

        it.each(updateCases)("Should update an user's %s by id", async (_field, updateParams) => {
            const response = await request(app).put(`/users/${id}`).send(updateParams).expect(201);

            expect(response.body).toStrictEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    creationDate: expect.any(String),
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

            expect(response.body).toStrictEqual([
                { field: "id", message: "Id must exist in database" },
            ]);
        });
        it("Should return an array with errors when no fields are given", async () => {
            const response = await request(app).put(`/users/${id}`).expect(400);

            expect(response.body).toStrictEqual([
                {
                    field: "Name, email, password",
                    message: "Name, email or password must be defined",
                },
            ]);
        });
        it("Should return an array with errors when fields are invalid", async () => {
            const response = await request(app)
                .put(`/users/${id}`)
                .send({
                    email: "dsawf",
                    password: "01",
                })
                .expect(400);

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
        it("Should return an error 500 in case of an internal error", async () => {
            disableMock();
            await request(app)
                .put(`/users/${id}`)
                .send({
                    name: "Talbnesor Drahcir",
                    email: "this@email.com",
                    password: "5555555555",
                })
                .expect(500);
        });
    });
    describe("DELETE /users/:id", () => {
        it("Should return an user by id", async () => {
            const { id } = await createUser();
            await request(app).delete(`/users/${id}`).expect(204);
        });
        it("Should return an array with errors when the id is not valid", async () => {
            const response = await request(app).delete(`/users/${getId()}`).expect(404);

            expect(response.body).toStrictEqual([
                { field: "id", message: "Id must exist in database" },
            ]);
        });
        it("Should return an error 500 in case of an internal error", async () => {
            disableMock();
            await request(app).delete(`/users/${getId()}`).expect(500);
        });
    });

    describe("Server shutdown", () => {
        it("Should disconnect to the database and close the server if the application is listening", async () => {
            await shutdown();
            expect(closeServerSpy).toBeCalledTimes(1);
            expect(DatabaseConnections.disconnect).toBeCalledTimes(1);
        });
        it("Should disconnect to the database and not try to close the server if the application is not listening", async () => {
            app.close.mockClear();
            DatabaseConnections.disconnect.mockClear();
            await shutdown();
            expect(closeServerSpy).toBeCalledTimes(0);
            expect(DatabaseConnections.disconnect).toBeCalledTimes(1);
        });
    });

    async function createUser() {
        const response = await request(app)
            .post("/users")
            .send({
                name: "Richard Rosenblat",
                email: randomEmail(),
                password: "0123456798",
            })
            .expect(201);
        return response.body;
    }
});

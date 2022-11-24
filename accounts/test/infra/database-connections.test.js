import { MongoClient } from "mongodb";
import { DatabaseConnections } from "../../src/infra/database-connections";
import { mongoDbClientMock } from "../util/mongoClientMock";

jest.mock("mongodb");
const disconnect = jest.fn();

beforeAll(() => {
	MongoClient.mockImplementation((connectionString) => {
		const mock = new mongoDbClientMock(connectionString);
		mock.on("topologyClosed", disconnect);
		return mock;
	});
});

describe("The database connections object class", () => {
	const validConnectionData = {
		connectionString: "mongodb://validString:00000",
		databaseName: "db",
		collection: "col",
	};
	const invalidConnectionData = {
		connectionString: "mongodb://invalidString:00000",
		databaseName: "db",
		collection: "col",
	};

	it("Should be ready to connect once the class is loaded ", async () => {
		expect(DatabaseConnections.status).toBe("Ready to connect");
	});
	it("Should not try to disconnect to the database if not previously connected", async () => {
		DatabaseConnections.disconnect();
		expect(DatabaseConnections.status).toBe("Ready to connect");
		expect(disconnect).not.toBeCalled();
	});
	it("Should connect to the database, changing status to connected ", async () => {
		DatabaseConnections.connect(validConnectionData);

		expect(MongoClient).toBeCalledTimes(1);
		expect(DatabaseConnections.status).toBe("Connected");
	});
	it("Should connect to the database only once", async () => {
		DatabaseConnections.connect(validConnectionData);
		DatabaseConnections.connect(validConnectionData);

		expect(MongoClient).toBeCalledTimes(1);
	});
	it("Should disconnect to the database if previously connected", async () => {
		DatabaseConnections.connect(validConnectionData);
		DatabaseConnections.disconnect();
		expect(DatabaseConnections.status).toBe("Disconnected");
		expect(disconnect).toBeCalledTimes(1);
	});
	it("Should throw exception and not connect if not able to connect to the database", async () => {
		jest.spyOn(console, 'error').mockImplementationOnce(() => {})
		expect(() => DatabaseConnections.connect(invalidConnectionData)).rejects.toThrowError(
			"Unnable to connect to given database string"
		);
	});
});

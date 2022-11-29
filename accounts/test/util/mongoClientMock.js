import { EventEmitter } from "events";
import { mockMongoDriver } from "./mongoDbDriverMock.js";

export class mongoDbClientMock extends EventEmitter {
	constructor(connectionString) {
		super();
		this.connectionString = connectionString;
		this.databaseName = "";
		this.collectionName = "";
	}
	async connect() {
		if (this.connectionString === "mongodb://invalidString:00000") {
			throw new Error("Mock connection error");
		}
		this.emit("open");
		return this;
	}
	db(databaseName) {
		this.databaseName = databaseName;
		return this;
	}
	collection(collectionName) {
		this.collectionName = collectionName;
		return mockMongoDriver(collectionName);
	}
	close() {
		this.emit("topologyClosed");
		return this;
	}
}

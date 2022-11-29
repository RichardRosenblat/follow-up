import { MongoClient } from "mongodb";

export class DatabaseConnections {
	static #instance;
	static #status = "Ready to connect";

	static async connect({ connectionString, databaseName, collection }) {
		if (!this.#instance) {
			try {
				const client = new MongoClient(connectionString);

				client.on("open", () => {
					console.log(`Connected to MongoDb Server`);
					this.#status = `Connected`;
				});
				
				client.on("topologyClosed", () => {
					console.log(`Disconnecting MongoDb Server`);
					this.#status = `Disconnected`;
				});

				this.#instance = await client.connect();
			} catch (error) {
				console.error(error);
				throw new Error("Unnable to connect to given database string");
			}
		}
		return this.#instance.db(databaseName).collection(collection);
	}

	static disconnect() {
		if (this.#instance) {
			this.#instance.close();
			this.#instance = null;
		}
	}

	static get status() {
		return this.#status;
	}
}

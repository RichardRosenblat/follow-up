import { MongoClient } from "mongodb";

export class DatabaseConnections {
    static #instance;

    static async connect({ connectionString, databaseName, collection }) {
        if (!this.#instance) {
            try {
                const client = new MongoClient(connectionString);
                this.#instance = await client.connect();
            } catch (error) {
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
}

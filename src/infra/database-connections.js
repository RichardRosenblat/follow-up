import { MongoClient } from "mongodb";

export class DatabaseConnections {
    static #instance;
    static #status;

    static async connect({ connectionString, databaseName, collection }) {
        if (!this.#instance) {
            try {
                const client = new MongoClient(connectionString);

                client.on("open", () => {
                    this.#status = `Connected`;
                });

                client.on("topologyClosed", () => {
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

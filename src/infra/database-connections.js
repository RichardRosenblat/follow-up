import { MongoClient } from "mongodb";

export class DatabaseConnections {
    static #connections = {};

    
    static async connect({ connectionString, databaseName, collection }) {
        if (!this.#connections[connectionString]) {
            try {
                const client = new MongoClient(connectionString);
                this.#connections[connectionString] = await client.connect();
            } catch (error) {
                throw new Error("Unnable to connect to given database string");
            }
        }
        return this.#connections[connectionString].db(databaseName).collection(collection);
    }

    static disconnect({ connectionString }) {
        const connection = this.#connections[connectionString];
        if (connection) {
            connection.close();
            delete this.#connections[connectionString];
        }
    }
}

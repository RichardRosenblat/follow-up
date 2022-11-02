
import randomEmail from "random-email";
import { DatabaseConnections } from "../../src/infra/database-connections.js";
import { UserRepository } from "../../src/repository/user.repository.js";
import { CreateUserUseCase } from "../../src/use-cases/create-user.js";
import { getUserWithFormattedData } from "../util/getUserWithFormattedData.js";


async function testCreateUser() {
    const connectionData = {
        connectionString: "mongodb://localhost:27017",
        databaseName: "follow-up",
        collection: "users",
    }
    const db = await DatabaseConnections.connect(connectionData);
    const repository = new UserRepository(db);
    const createUser = new CreateUserUseCase(repository);

    const specificEmail = randomEmail();

    const regular = await createUser.execute("Fulano Of Tal", specificEmail, "qwertyuiop");

    const repeatedEmail = await createUser.execute("Fulano Of Tal", specificEmail, "qwertyuiop");
    const invalidEmail = await createUser.execute("Fulano Of Tal", "invalid email", "qwertyuiop");
    const tooShortPassword = await createUser.execute("Fulano Of Tal", randomEmail(), "12345");

    const noName = await createUser.execute("", randomEmail(), "qwertyuiop");
    const noEmail = await createUser.execute("Fulano Of Tal", "", "qwertyuiop");
    const noPassword = await createUser.execute("Fulano Of Tal", randomEmail(), "");
    const noUserInfo = await createUser.execute("", "", "");

    console.log("Creating user: ", getUserWithFormattedData(regular));

    console.log("--------------------------------------");

    console.log("Repeated email: ", getUserWithFormattedData(repeatedEmail));
    console.log("Invalid email: ", getUserWithFormattedData(invalidEmail));
    console.log("Password too short: ", getUserWithFormattedData(tooShortPassword));

    console.log("--------------------------------------");

    console.log("No name: ", getUserWithFormattedData(noName));
    console.log("No email: ", getUserWithFormattedData(noEmail));
    console.log("No password: ", getUserWithFormattedData(noPassword));
    console.log("No user info: ", getUserWithFormattedData(noUserInfo));

    DatabaseConnections.disconnect(connectionData)
}

testCreateUser();

import randomEmail from "random-email";
import { UserEntity } from "../../src/entities/user.entity.js";
import { DatabaseConnections } from "../../src/infra/database-connections.js";
import { UserRepository } from "../../src/repository/user.repository.js";
import { CreateUserUseCase } from "../../src/use-cases/create-user.js";
import { getUserWithFormattedData } from "../util/getUserWithFormattedData.js";

async function testRepository() {
    const connectionData = {
        connectionString: "mongodb://localhost:27017",
        databaseName: "follow-up",
        collection: "users",
    }
    const db = await DatabaseConnections.connect(connectionData);
    const repository = new UserRepository(db);
    const createUser = new CreateUserUseCase(repository);

    await createUser.execute("Josué Lucas", randomEmail(), "123@jsls");
    await createUser.execute("Richard Rosenblat", randomEmail(), "123456789");
    await createUser.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");

    const specificEmail = randomEmail();

    await repository.save(
        new UserEntity({ name: "Valentina Isidora Robertson Vega", email: specificEmail, password: "qwertyuiop" })
    );

    console.log("--------------------------------------");
    console.log("Saved users:");
    console.log((await repository.list()).map((user) => getUserWithFormattedData(user)));
    console.log(
        `Does the email '${specificEmail}' exists: `,
        Boolean(await repository.doesEmailAlreadyExist(specificEmail))
    );
    console.log("--------------------------------------");

    DatabaseConnections.disconnect(connectionData)
}

testRepository();

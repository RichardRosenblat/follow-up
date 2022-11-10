import randomEmail from "random-email";
import { UserEntity } from "../../src/entities/user.entity.js";
import { ClassesFactory } from "../util/classesFactory.js";

async function testRepository() {
    const { userRepository, userCreate } = await ClassesFactory.getUserClasses();

    await userCreate.execute("Josué Lucas", randomEmail(), "123@jsls");
    await userCreate.execute("Richard Rosenblat", randomEmail(), "123456789");
    await userCreate.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");
    await userCreate.execute("Jhonn Doe", randomEmail(), "qwertyuiop");

    const specificEmail = randomEmail();

    await userRepository.save(
        new UserEntity({ name: "Valentina Vega", email: specificEmail, password: "qwertyuiop" })
    );

    console.log("--------------------------------------");
    console.log("Saved users:");
    console.log((await userRepository.listAll()).map((user) => user.toLiteral()));
    console.log(
        `Does the email '${specificEmail}' exists: `,
        Boolean(await userRepository.doesEmailAlreadyExist(specificEmail))
    );
    console.log("--------------------------------------");

    let CRUDTests = await userCreate.execute("Jhonn Doe", randomEmail(), "qwertyuiop");
    console.log(
        "Find one:",
        (await userRepository.findFirst({ _id: CRUDTests.id })).toLiteral()
    );

    CRUDTests = await userRepository.updateOne(CRUDTests.id, { name: "Joanna Doe" });
    console.log("Update one:", CRUDTests.toLiteral());

    console.log("Delete one:", await userRepository.deleteOne(CRUDTests.id));

    await ClassesFactory.cleanUpTestDatabases();
}

testRepository();

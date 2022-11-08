import randomEmail from "random-email";
import { ClassesFactory } from "../util/classesFactory.js";
import { UuidManager } from "../../src/infra/uuidManager.js";

async function testCreatePosts() {
    const { userRepository, userCreate } = await ClassesFactory.getUserClasses();
    const { postCreate } = await ClassesFactory.getPostClasses();

    const user = await userCreate.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");
    await postCreate.execute("this is post 0", user.id);

    const regular = await postCreate.execute("this is post 1", user.id);
    const noUser = await postCreate.execute("this is post 1", "");
    const noText = await postCreate.execute("", user.id);
    const invalidUserId = await postCreate.execute("this is post 1", UuidManager.getUuid());
    const noInfo = await postCreate.execute("", "");

    console.log("Created post:", regular.toLiteral());
    console.log(
        "Created post's user:",
        (await userRepository.findFirst({ _id: user.id })).toLiteral()
    );
    console.log("No user:", noUser);
    console.log("No text:", noText);
    console.log("Invalid user:", invalidUserId);
    console.log("No info:", noInfo);

    await ClassesFactory.cleanUpTestDatabases();
}

testCreatePosts();

import randomEmail from "random-email";
import { ClassesFactory } from "../util/classesFactory.js";
import { getId } from "../../src/infra/idManager.js";

async function testCreatePosts() {
    const { userRepository, userCreate } = await ClassesFactory.getUserClasses();
    const { postCreate } = await ClassesFactory.getPostClasses();

    const user = await userCreate.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");
    await postCreate.execute("this is post 0", user.id);

    const regular = await postCreate.execute("this is post 1", user.id);
    const noUser = await postCreate.execute("this is post 1", "");
    const noText = await postCreate.execute("", user.id);
    const invalidUserId = await postCreate.execute("this is post 1", getId());
    const noInfo = await postCreate.execute("", "");

    console.log("Created post:", regular);
    console.log("Created post's user:", (await userRepository.findById(user.id)).toLiteral());
    console.log("No user:", noUser);
    console.log("No text:", noText);
    console.log("Invalid user:", invalidUserId);
    console.log("No info:", noInfo);

    await ClassesFactory.cleanUpTestDatabases();
}

testCreatePosts();

import randomEmail from "random-email";
import { ObjectId } from "mongodb";
import {
    getPostWithFormattedData,
    getUserWithFormattedData,
} from "../util/getEntityWithFormattedData.js";
import { ClassesFactory } from "../util/classesFactory.js";

async function testCreatePosts() {
    const { userRepository, userCreate } = await ClassesFactory.getUserClasses();
    const { postCreate } = await ClassesFactory.getPostClasses();

    const user = await userCreate.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");
    await postCreate.execute("this is post 0", user._id);

    const regular = await postCreate.execute("this is post 1", user._id);
    const noUser = await postCreate.execute("this is post 1", "");
    const noText = await postCreate.execute("", user._id);
    const invalidUserId = await postCreate.execute("this is post 1", new ObjectId());
    const noInfo = await postCreate.execute("", "");

    console.log("Created post:", getPostWithFormattedData(regular));
    console.log(
        "Created post's user:",
        getUserWithFormattedData(await userRepository.findFirst({ _id: user._id }))
    );
    console.log("No user:", getPostWithFormattedData(noUser));
    console.log("No text:", getPostWithFormattedData(noText));
    console.log("Invalid user:", getPostWithFormattedData(invalidUserId));
    console.log("No info:", getPostWithFormattedData(noInfo));

    await ClassesFactory.cleanUpTestDatabases();
}

testCreatePosts();

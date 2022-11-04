import randomEmail from "random-email";
import { getPostWithFormattedData } from "../util/getEntityWithFormattedData.js";
import { ObjectId } from "mongodb";
import { ClassesFactory } from "../util/classesFactory.js";

async function testRepository() {
    const { userCreate } = await ClassesFactory.getUserClasses();
    const { postRepository, postCreate } = await ClassesFactory.getPostClasses();

    const user = await userCreate.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");

    await postCreate.execute("this is post 1", user._id);
    await postCreate.execute("this is post 2", user._id);
    await postCreate.execute("this is post 3", user._id);
    await postCreate.execute("this is post 4", user._id);

    console.log("--------------------------------------------------");
    console.log(
        "Saved posts:",
        (await postRepository.list()).map((post) => getPostWithFormattedData(post))
    );
    console.log("--------------------------------------------------");

    const randomText = new ObjectId().toHexString();
    await postCreate.execute(randomText, user._id);

    const firstFound = await postRepository.findFirst({ text: randomText });
    console.log("Find one:", getPostWithFormattedData(firstFound));

    const updatedOne = await postRepository.updateOne(firstFound._id, { text: "this is post 5" });
    console.log("Update one:", getPostWithFormattedData(updatedOne));

    const deletedOne = await postRepository.deleteOne(updatedOne._id);
    console.log("Delete one:", deletedOne);

    await ClassesFactory.cleanUpTestDatabases();
}

testRepository();

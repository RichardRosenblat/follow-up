import randomEmail from "random-email";
import { ClassesFactory } from "../util/classesFactory.js";
import { getId } from "../../src/infra/idManager.js";

async function testRepository() {
    const { userCreate } = await ClassesFactory.getUserClasses();
    const { postRepository, postCreate } = await ClassesFactory.getPostClasses();

    const user = await userCreate.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");

    await postCreate.execute("this is post 1", user.id);
    await postCreate.execute("this is post 2", user.id);
    await postCreate.execute("this is post 3", user.id);
    await postCreate.execute("this is post 4", user.id);

    console.log("--------------------------------------------------");
    console.log(
        "Saved posts:",
        (await postRepository.listAll()).map((post) => post.toLiteral())
    );
    console.log("--------------------------------------------------");

    const randomText = getId().toHexString();
    const createdPost = await postCreate.execute(randomText, user.id);

    const foundById = await postRepository.findById(createdPost.id);
    console.log("Find by id:", foundById.toLiteral());

    const updatedOne = await postRepository.updateOne(foundById.id, { text: "this is post 5" });
    console.log("Update one:", updatedOne.toLiteral());

    const deletedOne = await postRepository.deleteOne(updatedOne.id);
    console.log("Delete one count:", deletedOne);

    await ClassesFactory.cleanUpTestDatabases();
}

testRepository();

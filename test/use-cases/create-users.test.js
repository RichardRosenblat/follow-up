import randomEmail from "random-email";
import { ClassesFactory } from "../util/classesFactory.js";
import { getUserWithFormattedData } from "../util/getEntityWithFormattedData.js";

async function testCreateUser() {
    const { userCreate } = await ClassesFactory.getUserClasses();

    const specificEmail = randomEmail();

    const regular = await userCreate.execute("Fulano Of Tal", specificEmail, "qwertyuiop");

    const repeatedEmail = await userCreate.execute("Fulano Of Tal", specificEmail, "qwertyuiop");
    const invalidEmail = await userCreate.execute("Fulano Of Tal", "invalid email", "qwertyuiop");
    const tooShortPassword = await userCreate.execute("Fulano Of Tal", randomEmail(), "12345");

    const noName = await userCreate.execute("", randomEmail(), "qwertyuiop");
    const noEmail = await userCreate.execute("Fulano Of Tal", "", "qwertyuiop");
    const noPassword = await userCreate.execute("Fulano Of Tal", randomEmail(), "");
    const noUserInfo = await userCreate.execute("", "", "");

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

    await ClassesFactory.cleanUpTestDatabases();
}

testCreateUser();


import randomEmail from "random-email";
import { AccountUtilsFactory } from "../factories/account-utils.factory.js";

function testCreateUser() {
    const { createUser } = AccountUtilsFactory.getAccountRepositoryAndCreateUser();

    const specificEmail = randomEmail();

    const regular = createUser.execute("Fulano Of Tal", specificEmail, "qwertyuiop");

    const repeatedEmail = createUser.execute("Fulano Of Tal", specificEmail, "qwertyuiop");
    const invalidEmail = createUser.execute("Fulano Of Tal", "invalid email", "qwertyuiop");
    const tooShortPassword = createUser.execute("Fulano Of Tal", randomEmail(), "12345");

    const noName = createUser.execute("", randomEmail(), "qwertyuiop");
    const noEmail = createUser.execute("Fulano Of Tal", "", "qwertyuiop");
    const noPassword = createUser.execute("Fulano Of Tal", randomEmail(), "");
    const noUserInfo = createUser.execute("", "", "");

    console.log("Creating account: ", regular);

    console.log("--------------------------------------");

    console.log("Repeated email: ", repeatedEmail);
    console.log("Invalid email: ", invalidEmail);
    console.log("Password too short: ", tooShortPassword);

    console.log("--------------------------------------");

    console.log("No name: ", noName);
    console.log("No email: ", noEmail);
    console.log("No password: ", noPassword);
    console.log("No user info: ", noUserInfo);
}

testCreateUser();

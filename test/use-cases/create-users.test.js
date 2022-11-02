
import randomEmail from "random-email";
import { userToLiteralWithFormattedDate } from "../../util/userMappers/userToLiteral.js";
import { UserUtilsFactory } from "../factories/user-utils.factory.js";

function testCreateUser() {
    const { createUser } = UserUtilsFactory.getUserRepositoryAndCreateUser();

    const specificEmail = randomEmail();

    const regular = createUser.execute("Fulano Of Tal", specificEmail, "qwertyuiop");

    const repeatedEmail = createUser.execute("Fulano Of Tal", specificEmail, "qwertyuiop");
    const invalidEmail = createUser.execute("Fulano Of Tal", "invalid email", "qwertyuiop");
    const tooShortPassword = createUser.execute("Fulano Of Tal", randomEmail(), "12345");

    const noName = createUser.execute("", randomEmail(), "qwertyuiop");
    const noEmail = createUser.execute("Fulano Of Tal", "", "qwertyuiop");
    const noPassword = createUser.execute("Fulano Of Tal", randomEmail(), "");
    const noUserInfo = createUser.execute("", "", "");

    console.log("Creating user: ", userToLiteralWithFormattedDate(regular));

    console.log("--------------------------------------");

    console.log("Repeated email: ", userToLiteralWithFormattedDate(repeatedEmail));
    console.log("Invalid email: ", userToLiteralWithFormattedDate(invalidEmail));
    console.log("Password too short: ", userToLiteralWithFormattedDate(tooShortPassword));

    console.log("--------------------------------------");

    console.log("No name: ", userToLiteralWithFormattedDate(noName));
    console.log("No email: ", userToLiteralWithFormattedDate(noEmail));
    console.log("No password: ", userToLiteralWithFormattedDate(noPassword));
    console.log("No user info: ", userToLiteralWithFormattedDate(noUserInfo));
}

testCreateUser();

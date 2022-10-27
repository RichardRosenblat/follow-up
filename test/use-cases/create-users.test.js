
import randomEmail from "random-email";
import { getAccountRepositoryAndUseCase } from "../factories/account-utils.factory.js";

function testCreateUser() {
    const { useCase } = getAccountRepositoryAndUseCase();

    const specificEmail = randomEmail();

    const regular = useCase.createUser("Fulano Of Tal", specificEmail, "qwertyuiop");

    const repeatedEmail = useCase.createUser("Fulano Of Tal", specificEmail, "qwertyuiop");
    const invalidEmail = useCase.createUser("Fulano Of Tal", "invalid email", "qwertyuiop");
    const tooShortPassword = useCase.createUser("Fulano Of Tal", randomEmail(), "12345");

    const noName = useCase.createUser("", randomEmail(), "qwertyuiop");
    const noEmail = useCase.createUser("Fulano Of Tal", "", "qwertyuiop");
    const noPassword = useCase.createUser("Fulano Of Tal", randomEmail(), "");
    const noUserInfo = useCase.createUser("", "", "");

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

import { createUser } from "../../src/use-cases/create-user.js";
import randomEmail from "random-email";

function testCreateUser() {
	const specificEmail = randomEmail();

	const regular = createUser("Fulano Of Tal", specificEmail, "qwertyuiop");

	const repeatedEmail = createUser("Fulano Of Tal", specificEmail, "qwertyuiop");
	const invalidEmail = createUser("Fulano Of Tal", "invalid email", "qwertyuiop");
	const tooShortPassword = createUser("Fulano Of Tal", randomEmail(), "12345");

	const noName = createUser("", randomEmail(), "qwertyuiop");
	const noEmail = createUser("Fulano Of Tal", "", "qwertyuiop");
	const noPassword = createUser("Fulano Of Tal", randomEmail(), "");
	const noUserInfo = createUser("", "", "");

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

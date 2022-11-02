import randomEmail from "random-email";
import { UserEntity } from "../../src/entities/user.entity.js";
import { userToLiteralWithFormattedDate } from "../../util/userMappers/userToLiteral.js";
import { UserUtilsFactory } from "../factories/user-utils.factory.js";

function testRepository() {
	const { repository, createUser } = UserUtilsFactory.getUserRepositoryAndCreateUser();

	createUser.execute("Josué Lucas", randomEmail(), "123@jsls");
	createUser.execute("Richard Rosenblat", randomEmail(), "123456789");
	createUser.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");

	const specificEmail = randomEmail();

	repository.save(new UserEntity("Fulano Of Tal", specificEmail, "qwertyuiop"));

	console.log("--------------------------------------");
	console.log("Saved users:");
	console.log(repository.list().map((user) => userToLiteralWithFormattedDate(user)));
	console.log(`Does the email '${specificEmail}' exists: `, repository.doesEmailAlreadyExist(specificEmail));
	console.log("--------------------------------------");
}

testRepository();

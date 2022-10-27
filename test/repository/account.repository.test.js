import randomEmail from "random-email";
import { AccountEntity } from "../../src/entities/account.entity.js";
import { AccountUtilsFactory} from "../factories/account-utils.factory.js";

function testRepository() {
    const { repository, createUser } = AccountUtilsFactory.getAccountRepositoryAndCreateUser();

    createUser.execute("Josué Lucas", randomEmail(), "123@jsls");
    createUser.execute("Richard Rosenblat", randomEmail(), "123456789");
    createUser.execute("Fulano Of Tal", randomEmail(), "qwertyuiop");

    const specificEmail = randomEmail();

    repository.save(new AccountEntity("Fulano Of Tal", specificEmail, "qwertyuiop"));

    console.log("--------------------------------------");
    console.log("Saved accounts:");
    console.log(repository.list());
    console.log(`Does the email '${specificEmail}' exists: `, repository.doesEmailAlreadyExist(specificEmail));
    console.log("--------------------------------------");
}

testRepository();

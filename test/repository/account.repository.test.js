import { createUser } from "../../src/use-cases/create-user.js";
import { list, save, doesEmailAlreadyExist } from "../../src/repository/account.repository.js";
import randomEmail from "random-email";
import { AccountEntity } from "../../src/entidades/conta.entity.js";

function testRepository() {
    createUser("Josué Lucas", randomEmail(), "123@jsls");
    createUser("Richard Rosenblat", randomEmail(), "123456789");
    createUser("Fulano Of Tal", randomEmail(), "qwertyuiop");

    const specificEmail = randomEmail()

    save(new AccountEntity("Fulano Of Tal",specificEmail,'qwertyuiop'));

    
    console.log("--------------------------------------");
    console.log('Saved accounts:');
    console.log(list());
    console.log(`Does the email '${specificEmail}' exists: `,doesEmailAlreadyExist(specificEmail));
    console.log("--------------------------------------");
}

testRepository();

import { createUser } from "../../src/use-cases/create-user.js";
import { list, save, doesEmailAlreadyExist } from "../../src/repository/account.repository.js";
import randomEmail from "random-email";

function testRepository() {
    createUser("Josué Lucas", randomEmail(), "123@jsls");
    createUser("Richard Rosenblat", randomEmail(), "123456789");
    createUser("Fulano Of Tal", randomEmail(), "qwertyuiop");

    const specificEmail = randomEmail()

    save({
        id: "54779df7-399b-4c3c-849f-5ee97d3690ef",
        nome: "Fulano Of Tal",
        email: specificEmail,
        senha: "qwertyuiop",
        dataCriacao: "2022-10-19",
    });
    
    console.log("--------------------------------------");
    console.log('Saved accounts:');
    console.log(list());
    console.log(`Does the email '${specificEmail}' exists: `,doesEmailAlreadyExist(specificEmail));
    console.log("--------------------------------------");
}

testRepository();

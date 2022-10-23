import { criarUsuario } from "../../src/casos-de-uso/cria-usuario.js";
import randomEmail from "random-email";

function testarCriarUsuario() {
    const emailRepetido = randomEmail();
    criarUsuario("Josué Lucas", randomEmail(), "123@jsls");
    criarUsuario("Richard Rosenblat", randomEmail(), "123456789");
    criarUsuario("Fulano De Tal", randomEmail(), "qwertyuiop");

    console.log("--------------------------------------");
    
    criarUsuario("Fulano De Tal", emailRepetido, "qwertyuiop");
    criarUsuario("Fulano De Tal", emailRepetido, "qwertyuiop");
    criarUsuario("", randomEmail(), "");

}

testarCriarUsuario();

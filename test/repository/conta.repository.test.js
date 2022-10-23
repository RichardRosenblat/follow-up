import { criarUsuario } from "../../src/casos-de-uso/cria-usuario.js";
import { lista, salva } from "../../src/repository/conta.repository.js";
import randomEmail from "random-email";

function testarRepository() {
    criarUsuario("Josué Lucas", randomEmail(), "123@jsls");
    criarUsuario("Richard Rosenblat", randomEmail(), "123456789");
    criarUsuario("Fulano De Tal", randomEmail(), "qwertyuiop");

    salva({
        id: "54779df7-399b-4c3c-849f-5ee97d3690ef",
        nome: "Fulano De Tal",
        email: "hohudu@nik.ae",
        senha: "qwertyuiop",
        dataCriacao: "2022-10-19",
    });
    
    console.log("--------------------------------------");
    console.log(lista());
    console.log("--------------------------------------");
}

testarRepository();

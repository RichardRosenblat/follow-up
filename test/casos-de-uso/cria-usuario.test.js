import { criarUsuario } from "../../src/casos-de-uso/cria-usuario.js";


function testarCriarUsuario() {
    console.log(criarUsuario('Josué Lucas','josuelucas@email.com','123@jsls'));
    console.log(criarUsuario('Richard Rosenblat','example@email.com','123456789'));
    console.log(criarUsuario('Fulano De Tal','emailExistente@email.com','qwertyuiop'));
}

testarCriarUsuario()
import { criarUsuario } from "../../src/casos-de-uso/cria-usuario.js";
import { lista, salva } from "../../src/repository/conta.repository.js";

function testarRepository() {
    const usuario1 = criarUsuario('Josué Lucas','josuelucas@email.com','123@jsls');
    const usuario2 = criarUsuario('Richard Rosenblat','example@email.com','123456789');
    const usuario3 = criarUsuario('Fulano De Tal','emailExistente@email.com','qwertyuiop');

    salva(usuario1)
    salva(usuario2)
    salva(usuario3)

    console.log(lista());
}

testarRepository()
import crypto from "crypto";
import { salva } from "../repository/conta.repository.js";
import { criaContaValidador } from "../validadores/cria-conta.validador.js";

export function criarUsuario(nome, email, senha) {
    const validationResults = criaContaValidador(nome, email, senha);
    if (validationResults.temErros) {
        validationResults.erros.forEach((erro) => console.log(erro.mensagem));
        return;
    }
    const newUser = {
        id: crypto.randomUUID(),
        nome,
        email,
        senha,
        dataCriacao: new Date().toISOString().slice(0, 10),
    };
    console.log(salva(newUser));
}

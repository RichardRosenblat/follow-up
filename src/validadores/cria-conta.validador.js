import validator from "validator";
import { lista } from "../repository/conta.repository.js";

const validations = [
    {
        filter: (nome, email, senha) => validator.isEmpty(nome),
        field: "nome",
        message: "Nome não pode ser vazio",
    },
    {
        filter: (nome, email, senha) => validator.isEmpty(senha),
        field: "senha",
        message: "Senha não pode ser vazia",
    },
    {
        filter: (nome, email, senha) => !validator.isLength(senha, { min: 8 }),
        field: "senha",
        message: "Senha precisa ter pelo menos 8 caracteres",
    },
    {
        filter: (nome, email, senha) => !validator.isEmail(email),
        field: "email",
        message: "Email deve ser em endereço de email válido",
    },
    {
        filter: (nome, email, senha) =>
            lista()
                .map((conta) => conta.email)
                .includes(email),
        field: "email",
        message: "Email precisa ser unico",
    },
];

export function criaContaValidador(nome, email, senha) {
    const validationObject = {
        temErros: false,
        erros: [],
        dados: {
            nome,
            email,
            senha,
        },
    };

    validations.forEach((validator) => {
        if (validator.filter(nome, email, senha)) {
            validationObject.temErros = true;
            validationObject.erros.push({
                campo: validator.field,
                mensagem: validator.message,
            });
        }
    });

    return validationObject;
}
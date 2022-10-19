import crypto from 'crypto'
export function criarUsuario(nome, email, senha) {
    return {
        id: crypto.randomUUID(),
        nome,
        email,
        senha,
        dataCriacao: new Date().toISOString().slice(0,10),
    };
}
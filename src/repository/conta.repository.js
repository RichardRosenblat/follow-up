import fs from "fs";

const CONTAS_PATH = "dados/contas.json";

export function salva(conta) {
    const listaSalva = lista();
    listaSalva.push(conta);

    const contastring = JSON.stringify(listaSalva);
    fs.writeFileSync(CONTAS_PATH, contastring);
    return conta;
}

export function lista() {
    try {
        return JSON.parse(fs.readFileSync(CONTAS_PATH));
    } catch (error) {
        return [];
    }
}

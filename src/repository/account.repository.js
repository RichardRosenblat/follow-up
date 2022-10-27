import fs from "fs";

export class AccountRepository {

    #cache;
    
    constructor(path = "data/accounts.json") {
        this.path = path;
    }

    save(account) {
        const savedList = list();
        savedList.push(account);

        const accountString = JSON.stringify(savedList);
        fs.writeFileSync(this.path, accountString);
        return account;
    }

    list() {
        if (!this.cache) {
            try {
                this.#cache = JSON.parse(fs.readFileSync(this.path));
            } catch {
                this.#cache = [];
            }
        }
        return this.#cache;
    }

    doesEmailAlreadyExist(email) {
        return list()
            .map((account) => account.email)
            .includes(email);
    }
}

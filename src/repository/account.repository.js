import fs from "fs";

export class AccountRepository {
    #cache;

    constructor(path = "data/accounts.json") {
        this.path = path;
    }

    save(account) {
        const savedList = this.list();
        savedList.push(account);

        const accountsString = JSON.stringify(savedList);
        fs.writeFileSync(this.path, accountsString);
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
        return this.list()
            .map((account) => account.email)
            .includes(email);
    }
}

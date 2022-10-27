import crypto from "crypto";
export class AccountEntity {    
    constructor(name, email, password) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
        this.creationDate = new Date().toISOString().slice(0, 10);
    }
}

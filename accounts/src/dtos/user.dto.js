export class UserDTO {
    constructor({ id, name, email, password, creationDate }) {
        this.id = id.toHexString();
        this.name = name;
        this.email = email;
        this.password = password;
        this.creationDate = creationDate.toISOString().slice(0, 10);
    }
}

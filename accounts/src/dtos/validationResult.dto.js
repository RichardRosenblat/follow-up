export class ValidationResultDTO {
    #errors;
    #data;

    get errors() {
        return this.#errors;
    }
    get data() {
        return this.#data;
    }

    constructor(data) {
        this.#errors = [];
        this.#data = data;
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    addError({ field, message }) {
        if (!this.#errorAlreadyExist(message, field)) {
            this.#errors.push({ field, message });
        }
    }
    #errorAlreadyExist(message, field) {
        return this.#errors.find((error) => error.message === message && error.field === field);
    }
}

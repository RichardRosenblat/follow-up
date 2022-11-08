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
        this.#errors.push({
            field: field,
            message: message,
        });
    }
}

export class ValidationResultDTO {
	#hasErrors;
	#errors;
	#data;

	get hasErrors() {
		return this.#hasErrors;
	}
	get errors() {
		return this.#errors;
	}
	get data() {
		return this.#data;
	}

	constructor(data) {
		this.#hasErrors = false;
		this.#errors = [];
		this.#data = data;
	}

	addError({ field, message }) {
		this.#hasErrors = true;
		this.#errors.push({
			field: field,
			message: message,
		});
	}
	toLiteral() {
		return {
			hasErrors: this.hasErrors,
			errors: this.errors,
			data: this.data,
		};
	}
}

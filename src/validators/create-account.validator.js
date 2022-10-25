import validator from "validator";
import { doesEmailAlreadyExist } from "../repository/account.repository.js";

const validations = [
	{
		validation: ({ name }) => validator.isEmpty(name),
		field: "name",
		message: "Name cannot be empty",
	},
	{
		validation: ({ password }) => validator.isEmpty(password),
		field: "password",
		message: "Password cannot be empty",
	},
	{
		validation: ({ password }) => !validator.isLength(password, { min: 8 }),
		field: "password",
		message: "Password must be minimum 8 caracters",
	},
	{
		validation: ({ email }) => !validator.isEmail(email),
		field: "email",
		message: "Email must be a valid email adress",
	},
	{
		validation: ({ email }) => doesEmailAlreadyExist(email),
		field: "email",
		message: "Email must be unique",
	},
];

export function createAccoundValidator(name, email, password) {
	const validationObject = {
		hasErrors: false,
		errors: [],
		data: {
			name,
			email,
			password,
		},
	};

	validations.forEach((validator) => {
		if (validator.validation({ name, email, password })) {
			validationObject.hasErrors = true;
			validationObject.errors.push({
				field: validator.field,
				message: validator.message,
			});
		}
	});

	return validationObject;
}
import fs from "fs";

const PATH = "data/accounts.json";
let cache;

export function save(account) {
	const savedList = list();
	savedList.push(account);

	const accountString = JSON.stringify(savedList);
	fs.writeFileSync(PATH, accountString);
	return account;
}

export function list() {
	if (!cache) {
		try {
			cache = JSON.parse(fs.readFileSync(PATH));
		} catch {
			cache = [];
		}
	}
	return cache;
}

export function doesEmailAlreadyExist(email) {
	return list()
		.map((account) => account.email)
		.includes(email);
}

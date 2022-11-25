import { v4 } from "uuid";
export class StoryRepository {
	#database;
	constructor(database) {
		this.#database = database;
	}
	async listAll() {
		return (await this.#database.Story.findAll()).map((story) => story?.dataValues);
	}
	async findById(id) {
		return (await this.#database.Story.findOne({ where: { id: String(id) } }))?.dataValues;
	}
	async create(story) {
		return (await this.#database.Story.create({ ...story, id: story.id || v4() }))?.dataValues;
	}
	async update(id, updateInfo) {
		await this.#database.Story.update(updateInfo, { where: { id: String(id) } });
		return (await this.#database.Story.findOne({ where: { id: String(id) } }))?.dataValues;
	}
	async delete(id) {
		await this.#database.Story.destroy({ where: { id: String(id) } });
	}
	async findByUserId(userId) {
		return (await this.#database.Story.findAll({ where: { userId: String(userId) } })).map(
			(story) => story?.dataValues
		);
	}
}

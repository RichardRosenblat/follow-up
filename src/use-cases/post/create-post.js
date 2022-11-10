import { PostEntity } from "../../entities/post.entity.js";
import { UuidManager } from "../../infra/uuidManager.js";
import { CreatePostValidator } from "../../validators/post/create-post.validator.js";

export class CreatePostUseCase {
	#validator;
	#postRepository;

	constructor(postRepository) {
		this.#postRepository = postRepository;

		this.#validator = new CreatePostValidator(this.#postRepository);
	}

	async execute(text, author_id) {
		const validationResult = await this.#validator.execute(text, author_id);

		if (validationResult.hasErrors()) {
			return validationResult.errors.map(({ message }) => message);
		}

		const newPost = new PostEntity({ text, author_id: UuidManager.getUuid(author_id) });

		return await this.#postRepository.save(newPost);
	}
}

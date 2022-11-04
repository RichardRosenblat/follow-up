import { ObjectId } from "mongodb";
import { PostEntity } from "../entities/post.entity.js";
import { CreatePostValidator } from "../validators/create-post.validator.js";

export class CreatePostUseCase {
	#userRepository;
	#validator;
	#postRepository;

	constructor(userRepository, postRepository) {
		this.#userRepository = userRepository;
		this.#validator = new CreatePostValidator(this.#userRepository);

		this.#postRepository = postRepository;
	}

	async execute(text, author_id) {
		const validationResult = await this.#validator.execute(text, author_id);

		if (validationResult.hasErrors) {
			return validationResult.errors.map((error) => error.message);
		}

		const newPost = new PostEntity({ text, author_id: new ObjectId(author_id) });

		return await this.#postRepository.save(newPost);
	}
}
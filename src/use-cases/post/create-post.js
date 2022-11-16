import { PostDTO } from "../../dtos/post.dto.js";
import { PostEntity } from "../../entities/post.entity.js";
import { getId } from "../../infra/idManager.js";
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

        const newPost = new PostEntity({ text, author_id: getId(author_id) });

        const createdPost = await this.#postRepository.save(newPost);
        return new PostDTO(createdPost);
    }
}

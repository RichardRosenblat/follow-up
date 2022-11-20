export class PostDTO {
    constructor(postEntity) {
        if (postEntity) {
            this.id = postEntity.id.toHexString();
            this.text = postEntity.text;
            this.author_id = postEntity.author_id.toHexString();
            this.creationDate = postEntity.creationDate.toISOString().slice(0, 10);
        }
    }
}

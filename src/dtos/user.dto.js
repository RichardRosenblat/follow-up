export class UserDTO {
    constructor(userEntity) {
        if (userEntity) {
            this.id = userEntity.id.toHexString();
            this.name = userEntity.name;
            this.email = userEntity.email;
            this.password = userEntity.password;
            this.posts = userEntity.posts.map((postId) => postId.toHexString());
            this.creationDate = userEntity.creationDate.toISOString().slice(0, 10);
        }
    }
}

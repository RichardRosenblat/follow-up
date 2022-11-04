export function getPostWithFormattedData(post) {
    if (Array.isArray(post)) {
        return post;
    }
    const postLiteral = post.toLiteral();
    return {
        ...postLiteral,
        _id: postLiteral._id.toHexString(),
        author_id:postLiteral.author_id.toHexString(),
        creationDate: postLiteral.creationDate.toISOString().slice(0, 10),
    };
}

export function getUserWithFormattedData(user) {
    if (Array.isArray(user)) {
        return user;
    }
    const userLiteral = user.toLiteral();
    return {
        ...userLiteral,
        _id: userLiteral._id.toHexString(),
        posts: userLiteral.posts.map(postId=>postId.toHexString()),
        creationDate: userLiteral.creationDate.toISOString().slice(0, 10),
    };
}

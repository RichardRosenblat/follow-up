export function getUserWithFormattedData(user) {
    if (Array.isArray(user)) {
        return user;
    }
    const userLiteral = user.toLiteral();
    return {
        ...userLiteral,
        _id: userLiteral._id.toHexString(),
        creationDate: userLiteral.creationDate.toISOString().slice(0, 10),
    };
}

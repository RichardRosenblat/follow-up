let userCache = [];
let postCache = [];
export function mockMongoDriver(collection) {
	return {
		find: () => ({
			toArray: () => {
				return getCollectionMock(collection);
			},
		}),
		findOne: ({ _id, email }) => {
			return getCollectionMock(collection).find(({ _id: mongoDocId, email: mongoDocEmail }) => {
				return _id ? mongoDocId.toHexString() === _id.toHexString() : email === mongoDocEmail;
			});
		},
		insertOne: (obj) => getCollectionMock(collection).push(obj),
		updateOne: ({ _id }, { $set, $push, $pull }) => {
			const collectionToUpdate = getCollectionMock(collection);
			let foundDocIndex;
			const foundDocument = collectionToUpdate.find(({ _id: mongoDocId }, index) => {
				foundDocIndex = index;
				return mongoDocId.toHexString() === _id.toHexString();
			});
			if (!foundDocument) {
				return null;
			}
			if ($set) {
				collectionToUpdate[foundDocIndex] = { ...collectionToUpdate[foundDocIndex], ...$set };
				return true;
			}
			if ($push) {
				const [arrayName, newValue] = Object.entries($push)[0];
				foundDocument[arrayName].push(newValue);
				collectionToUpdate[foundDocIndex] = foundDocument;
				return true;
			}
			if ($pull) {
				const [arrayName, valueToRemove] = Object.entries($pull)[0];
				const itemToRemoveIndex = foundDocument[arrayName].findIndex(
					(obj) => obj.toHexString() === valueToRemove.toHexString()
				);
				if (itemToRemoveIndex !== -1) {
					foundDocument[arrayName].splice(itemToRemoveIndex, 1);
				}
				collectionToUpdate[foundDocIndex] = foundDocument;
				return true;
			}
		},
		deleteOne: ({ _id }) => {
			const docIndex = getCollectionMock(collection).findIndex(
				(obj) => obj._id.toHexString() === _id.toHexString()
			);

			if (docIndex !== -1) {
				getCollectionMock(collection).splice(docIndex, 1);
			}

			return { deletedCount: 1 };
		},
	};
}

function getCollectionMock(collection) {
	return collection === "users" ? userCache : postCache;
}

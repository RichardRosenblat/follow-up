import { StoryEntity } from "../../src/entities/story.entity";

let storiesTable: { dataValues: StoryEntity }[] = [
    {
        dataValues: {
            id: "f345431b-3d56-4ee3-a70e-e8b93f1bc3bb",
            userId: "638013044e7c8f1e18b9448c",
            title: "title0",
            content: "content0",
            impressions: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
    {
        dataValues: {
            id: "bff2e601-f786-470a-bc3a-956f35dbedae",
            userId: "638013044e7c8f1e18b9448c",
            title: "title1",
            content: "content1",
            impressions: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
    {
        dataValues: {
            id: "6ba2b9ca-f25f-42c8-ac2f-fc3f429c5990",
            userId: "638013044e7c8f1e18b94495",
            title: "title2",
            content: "content2",
            impressions: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
];
const initialStoriesTable = [...storiesTable];

function resetStoriesTable() {
    storiesTable = [...initialStoriesTable];
}
export { storiesTable, resetStoriesTable };

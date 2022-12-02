import { v4 } from "uuid";
import { IMigration } from "../../types/infra/migration.type";
import { IDatabase } from "../../types/db.type";

export class StorySeed implements IMigration {
    constructor(private readonly db: IDatabase) {}
    async up(): Promise<void> {
        await this.db.Story.bulkCreate([
            {
                id: v4(),
                userId: "638013044e7c8f1e18b9448c",
                title: "Lorem",
                content:
                    "Pellentesque quam neque, posuere nec convallis ut, varius vel nisi. In sit amet dui ullamcorper, fringilla velit ut, condimentum ligula.",
                impressions: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b9448c",
                title: "ipsum.",
                content:
                    "Quisque mollis quam in augue blandit imperdiet. Maecenas nisi diam, tempor vel vestibulum eget, ullamcorper eu libero",
                impressions: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b9448c",
                title: "dolor.",
                content: "Aenean turpis nisi, congue non faucibus quis",
                impressions: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b9448c",
                title: "sit.",
                content:
                    "Sed cursus malesuada nulla in maximus. Donec odio tellus, gravida at consectetur a, bibendum at mauris. Morbi dapibus placerat dolor quis lobortis",
                impressions: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b94490",
                title: "amet.",
                content:
                    "Donec odio tellus, gravida at consectetur a, bibendum at mauris. Morbi dapibus placerat dolor quis lobortis",
                impressions: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b94491",
                title: "consectetur.",
                content:
                    "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sodales rhoncus risus, ut auctor justo.",
                impressions: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b94492",
                title: "adipiscing.",
                content: "Cras sed ultrices justo. Praesent semper orci et odio laoreet accumsan.",
                impressions: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b94493",
                title: "elit.",
                content:
                    "Nullam risus ligula, egestas eu risus vestibulum, maximus efficitur tortor.",
                impressions: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b94494",
                title: "Mauris.",
                content:
                    "uisque ultrices semper nulla, non tristique augue venenatis quis. Aenean velit arcu, ornare sit amet elit id, aliquam fringilla purus.",
                impressions: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b94495",
                title: "nec.",
                content:
                    "Phasellus vitae ullamcorper risus, ullamcorper gravida sem. Cras accumsan ultricies accumsan. Pellentesque ac nulla ante.",
                impressions: 9,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: v4(),
                userId: "638013044e7c8f1e18b94496",
                title: "sodales.",
                content:
                    "Maecenas enim nunc, ullamcorper vel ipsum vel, rhoncus facilisis dolor. Curabitur ut porttitor mauris.",
                impressions: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    }
    async down(): Promise<void> {
        await this.db.Story.destroy({ truncate: true });
    }
}

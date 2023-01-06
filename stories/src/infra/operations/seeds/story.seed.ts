import { v4 } from "uuid";
import { IDatabase } from "../../types/database.type";
import { IMigration } from "../../types/migration.type";
import { Model } from "sequelize";

export class StorySeed implements IMigration {
	constructor(private readonly database: IDatabase) {}
	async up(): Promise<void> {
		console.log("Seeding stories table...");

		try {
			const createdStories = await this.createStories();

			await this.updateStoriesDates(createdStories);

			console.log("Stories table seeded!");
		} catch (error: any) {
			this.logSeedingError("Unnable to seed stories", error);
		}
		console.log();
	}

	async down(): Promise<void> {
		console.log("Reverting seeding of stories table...");
		try {
			await this.database.tables.Story.destroy({ logging: false, truncate: true });
			console.log("Deleted all records of stories table!");
		} catch (error: any) {
			this.logSeedingError("Unnable to revert stories seed", error);
		}
		console.log();
	}

	private async createStories(): Promise<Model<any, any>[]> {
		return await this.database.tables.Story.bulkCreate(
			[
				{
					id: v4(),
					userId: "63991d83f4448ccd235d39e2",
					title: "Lorem",
					content:
						"Pellentesque quam neque, posuere nec convallis ut, varius vel nisi. In sit amet dui ullamcorper, fringilla velit ut, condimentum ligula.",
					impressions: 6101,
				},
				{
					id: v4(),
					userId: "63991d83f4448ccd235d39e2",
					title: "ipsum.",
					content:
						"Quisque mollis quam in augue blandit imperdiet. Maecenas nisi diam, tempor vel vestibulum eget, ullamcorper eu libero",
					impressions: 1101,
				},
				{
					id: v4(),
					userId: "63991d83f4448ccd235d39e2",
					title: "dolor.",
					content: "Aenean turpis nisi, congue non faucibus quis",
					impressions: 4101,
				},
				{
					id: v4(),
					userId: "63991d83f4448ccd235d39e2",
					title: "sit.",
					content:
						"Sed cursus malesuada nulla in maximus. Donec odio tellus, gravida at consectetur a, bibendum at mauris. Morbi dapibus placerat dolor quis lobortis",
					impressions: 101,
				},
				{
					id: v4(),
					userId: "63991d8bf4448ccd235d39e3",
					title: "amet.",
					content:
						"Donec odio tellus, gravida at consectetur a, bibendum at mauris. Morbi dapibus placerat dolor quis lobortis",
					impressions: 51101,
				},
				{
					id: v4(),
					userId: "63991d8bf4448ccd235d39e3",
					title: "consectetur.",
					content:
						"Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sodales rhoncus risus, ut auctor justo.",
					impressions: 3101,
				},
				{
					id: v4(),
					userId: "63991d96f4448ccd235d39e4",
					title: "adipiscing.",
					content: "Cras sed ultrices justo. Praesent semper orci et odio laoreet accumsan.",
					impressions: 27101,
				},
				{
					id: v4(),
					userId: "63991d96f4448ccd235d39e4",
					title: "elit.",
					content: "Nullam risus ligula, egestas eu risus vestibulum, maximus efficitur tortor.",
					impressions: 6101,
				},
				{
					id: v4(),
					userId: "63a34539a961c792121e585b",
					title: "Mauris.",
					content:
						"uisque ultrices semper nulla, non tristique augue venenatis quis. Aenean velit arcu, ornare sit amet elit id, aliquam fringilla purus.",
					impressions: 9101,
				},
				{
					id: v4(),
					userId: "63a34570a961c792121e585c",
					title: "nec.",
					content:
						"Phasellus vitae ullamcorper risus, ullamcorper gravida sem. Cras accumsan ultricies accumsan. Pellentesque ac nulla ante.",
					impressions: 4101,
				},
				{
					id: v4(),
					userId: "63a345eea961c792121e585d",
					title: "sodales.",
					content:
						"Maecenas enim nunc, ullamcorper vel ipsum vel, rhoncus facilisis dolor. Curabitur ut porttitor mauris.",
					impressions: 5101,
				},
			],
			{ logging: false }
		);
	}

	private async updateStoriesDates(createdStories: Model<any, any>[]): Promise<void> {
		const createdStoriesIds = createdStories.map((x) => x.dataValues.id);

		const dateCursor = new Date();

		for (let index = 0; index < createdStoriesIds.length; index++) {
			const id = createdStoriesIds[index];

			moveDateCursorToDayBefore(dateCursor);

			await this.database.tables.Story.update(
				{ createdAt: dateCursor, updatedAt: dateCursor },
				{
					where: {
						id,
					},
					logging: false,
					silent: true,
				}
			);
		}
		function moveDateCursorToDayBefore(dateCursor: Date) {
			dateCursor.setDate(dateCursor.getDate() - 1);
		}
	}
	private logSeedingError(message: string, error: any): void {
		console.log();
		console.log(`An error ocurred while seeding the Stories table: ${message}`);
		console.error(error.message);
	}
}

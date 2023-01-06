import { StoryEntity } from "../entities/story.entity";

export class StoryDTO {
	public id: string;
	public userId: string;
	public title: string;
	public content: string;
	public impressions: number;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(entity: StoryEntity) {
		this.id = entity.id;
		this.userId = entity.userId;
		this.title = entity.title;
		this.content = entity.content;
		this.impressions = entity.impressions;
		this.createdAt = entity.createdAt;
		this.updatedAt = entity.updatedAt;
	}
}

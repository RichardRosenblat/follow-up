export class StoryEntity {
    constructor(
        public id: string,
        public userId: string,
        public title: string,
        public content: string,
        public impressions: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}

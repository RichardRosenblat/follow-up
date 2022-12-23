import { IStory } from "./story.type";
import { IUser } from "./user.type";

export type IStoryWithUserData = Omit<IUser, "id"> & IStory;

import { IStory } from "../../types/story.type";
import { getAxiosToApi } from "../../utils/axios";

export function getStoriesByUserId(userId:string){
	return getAxiosToApi("stories").get<IStory[]>(`/v1/story?userId=${userId}`);
}

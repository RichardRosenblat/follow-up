import { IStory } from "../../types/story.type";
import { getAxiosToApi } from "../../utils/axios";

export function getAllStories() {
	return getAxiosToApi("stories").get<IStory[]>(`/v1/story`);
}

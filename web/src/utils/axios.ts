import axios from "axios";

const storiesBaseUrl = process.env.REACT_APP_STORIES_URL || "http://localhost:5000";
const usersBaseUrl = process.env.REACT_APP_ACCOUNTS_URL || "http://localhost:4000";

const apiClients = {
	stories: axios.create({ baseURL:storiesBaseUrl }),
	users: axios.create({ baseURL: usersBaseUrl }),
};

type apiOptions = keyof typeof apiClients;

export function getAxiosToApi(apiName: apiOptions) {
	return apiClients[apiName];
}

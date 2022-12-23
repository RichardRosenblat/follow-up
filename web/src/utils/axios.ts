import axios from "axios";

const storiesBaseUrl = process.env.REACT_APP_STORIES_URL || "http://localhost:5000";
const usersBaseUrl = process.env.REACT_APP_ACCOUNTS_URL || "http://localhost:4000";

const urls = {
	stories: axios.create({ baseURL:storiesBaseUrl }),
	users: axios.create({ baseURL: usersBaseUrl }),
};

type apiOptions = keyof typeof urls;

export function getAxiosToApi(apiName: apiOptions) {
	return urls[apiName];
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultPage from "./components/DefaultPage";
import Feed from "./pages/feed";
import NotFound from "./pages/not-found";
import Followers from "./pages/followers";

export default function AppRouter() {
	const loggedUserId = "63a34539a961c792121e585b";
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DefaultPage />}>
					<Route index element={<Feed userId={loggedUserId}/>} />
					<Route path="followers" element={<Followers userId={loggedUserId}/>} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

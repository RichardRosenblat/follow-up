import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import Feed from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<Feed />
	</React.StrictMode>
);

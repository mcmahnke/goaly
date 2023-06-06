import {Auth0Provider} from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@css/index.css";

const rootContainer: HTMLElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-jgk07h16kswx1avk.us.auth0.com"
			clientId="99OYxyrtsFjHuNd3NYsbBt7bC5M0vB8P"
			useRefreshTokens={true}
			useRefreshTokensFallback={false}
			authorizationParams={{
				redirect_uri: "http://localhost:5173/"
			}}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);

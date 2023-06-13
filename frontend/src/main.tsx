import {Auth0Provider} from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@css/index.css";

const rootContainer: HTMLElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootContainer).render(
	<React.StrictMode>
		<Auth0Provider
			domain={import.meta.env.AUTH0_DOMAIN}
			clientId={import.meta.env.AUTH0_CLIENT_ID}
			useRefreshTokens={true}
			useRefreshTokensFallback={false}
			authorizationParams={{
				audience: "http://localhost:8080",
				redirect_uri: "http://localhost:5173"
			}}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);

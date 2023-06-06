import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import "@css/App.css";
import {GoalyRouter} from "@/GoalyRoutes.tsx";



// This is our first React "Component"
export function App() {

	return (
		<BrowserRouter>
				<div className="App Goaly">
					<GoalyRouter />
				</div>
		</BrowserRouter>
	);
}

export default App;

import {useAuth0} from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
	const { isAuthenticated, loginWithRedirect} = useAuth0();

	if (!isAuthenticated) {
		loginWithRedirect();
	}

	return children;
};

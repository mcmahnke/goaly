import {UserType} from "@/GoalyTypes.ts";
import {httpClient} from "@/Services/HttpClient.tsx";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useEffect, useState} from "react";

export const Home = () => {
	
	const [currentUser, setCurrentUser] = useState<UserType>();
	const { user, isAuthenticated } = useAuth0();
	
	async function checkUser() {
		console.log(user.email);
		try {
			const response = await httpClient.search("/users", { email: user.email });
			console.log("Search succeeded: ", response.data);
			return response.data;
		}
		catch(err) {
			console.log("Search failed: ", err);
			try {
				const response2 = await httpClient.post("/users", {
					name: user.nickname,
					email: user.email,
					wins: 0,
					spendable: 0,
					equipped: 0
				});
				console.log("User added to database: ", response2.data);
				return response2.data;
			}
			catch(err2) {
				console.log("Failed adding user to database: ", err2);
			}
		}
	}
	
	if(isAuthenticated) {
		checkUser();
	}

	
	
	return (
		<div>
			<Title />
			{/*{isAuthenticated ?*/}
			{/*	<div className="align-bottom text-xl">*/}
			{/*		<p>Profile:</p>*/}
			{/*		<p>Name: {currentUser.name}</p>*/}
			{/*		<p>Wins: {currentUser.wins}</p>*/}
			{/*		<p>Available currency: {currentUser.spendable}</p>*/}
			{/*	</div> : null*/}
			{/*}*/}
		</div>
	);
};

export function Title() {
	return(
		<div className="flex flex-col items-center">
			<h1 className="text-9xl mb-0 text-sky-600">Goaly</h1>
			<h2 className="text-sky-800">(Almost) a really cool game</h2>
		</div>
	);
}





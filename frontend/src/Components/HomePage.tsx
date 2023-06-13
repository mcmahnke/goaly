import {httpClient} from "@/Services/HttpClient.tsx";
import {useAuth0} from "@auth0/auth0-react";

export const Home = () => {
	
	const { user, isAuthenticated } = useAuth0();
	
	async function checkUser() {
		console.log(user.email);
		try {
			const response = await httpClient.search("/users", { email: user.email });
			console.log("Search succeeded: ", response.data);
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
			}
			catch(err2) {
				console.log("Failed adding user to database: ", err2);
			}
		}
	}
	
	if(isAuthenticated) {
		console.log("RUNNING CHECKUSER");
		checkUser();
	}
	
	return (
		<div>
			<Title />

		</div>
	);
};

export function Title() {
	return(<h1>Goaly</h1>);
}





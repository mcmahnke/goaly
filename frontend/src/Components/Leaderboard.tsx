import axios from "axios";
import {useEffect, useState} from "react";

export const Leaderboard = () => {
	const [users, setUsers] = useState([]);
	
	useEffect(() => {
		const getUsers = async () => {
			const usersRes = await axios.get("http://localhost:8080/users");
			return usersRes.data.sort((a, b) => parseInt(b.wins) - parseInt(a.wins));
		};
		
		getUsers().then(setUsers);
	}, [users]);
	
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-5xl">Leaderboard</h1>
			{users ? (
				<ol>
					{users.map((aUser: { name: string, wins: number }) => (
						<li className="text-xl mb-5">
							{" "}
							{aUser.name} - {aUser.wins}
						</li>
					))}
				</ol>
			) : null}
		</div>
	);
};

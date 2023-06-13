import {EquipButton} from "@/Components/EquipButton.tsx";
import {httpClient} from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";
import {ItemType} from "@/GoalyTypes.js";
import axios from "axios";
import {BuyButton} from "@/Components/BuyButton.tsx";
import {ItemPostService} from "@/Services/ItemService.tsx";
import { useAuth0 } from "@auth0/auth0-react";

export const Shop = () => {

	const [currentItem, setCurrentItem] = useState({});
	const [itemsOwned, setItemsOwned] = useState([]);
	const [items, setItems] = useState([]);
	const { user } = useAuth0();

	const onBuyButtonClick = async (item_id: number, price: number) => {
		try {
			const response = await httpClient.search("/users", { email: user.email });
			console.log("Search succeeded: ", response.data);
			const userRes = response.data;
		
			if (userRes.spendable >= price) {
				setCurrentItem({item: item_id, owner: userRes.id});
				const newItemsOwned = [...itemsOwned, currentItem];
				setItemsOwned(newItemsOwned);
				await httpClient.put("/users", { email: userRes.email, name: userRes.name, wins: userRes.wins, spendable: (userRes.spendable - price), equipped: userRes.equipped });
				await ItemPostService.send(user.email, item_id);
			}
			else {
				console.log("You can't afford that!");
			}
		}
		catch(err) {
			console.log("Request failed: ", err);
		}
	};
	
	const onEquipButtonClick = async (item_id: number) => {
		try {
			const response = await httpClient.search("/users", { email: user.email });
			console.log("Search succeeded: ", response.data);
			const userRes = response.data;
			
			if (userRes.equipped != item_id) {
				await httpClient.put("/users", { email: userRes.email, name: userRes.name, wins: userRes.wins, spendable: userRes.spendable, equipped: item_id });
				console.log("Equip successful!");
			}
		}
		catch(err) {
			console.log("Request failed: ", err);
		}
	};
	
	const handleCheck = (item_id: number) => {
		try {
			return itemsOwned.find(e => e.item  ===  item_id);
		} catch(err) {
			return false;
		}
	};
	
	useEffect(() => {
		console.log("Shop Rerendered.");
	}, [itemsOwned]);

		useEffect(() => {
			const getItems= async () => {
				const itemsRes = await axios.get("http://localhost:8080/items");
				return itemsRes.data;
			};
			
			async function getItemsOwned() {
				try {
					console.log(user.email);
					const response = await httpClient.search("/items/owned", { email: user.email });
					console.log(response.data);
					return response.data;
				} catch (err) {
					console.error("Error getting owned items: ", err);
					return [];
				}
			}

			getItems().then(setItems);
			getItemsOwned().then(setItemsOwned);
			
		}, [user]);

		return (
			<div>
				<h2>Items:</h2>
				{items ? (
					<ul>
						{items.map((item: { id: number; name: string; price: number; description: string }) => (
							<li key={item.name}>
								{" "}
								{handleCheck(item.id) ?
									<>
										{item.description}{" "}
										<EquipButton
											item_id={item.id}
											onEquipButtonClick={onEquipButtonClick}
										/>
									</>:
									<>
										{item.description} - {item.price}{" "}
										
										<BuyButton
											item_id={item.id}
											price={item.price}
											onBuyButtonClick={onBuyButtonClick}
										/>
									</>}
							</li>
						))}
					</ul>
				) : null}
			</div>
		);
};

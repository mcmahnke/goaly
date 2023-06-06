import { Profile } from "@/Components/Profile.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import { useContext, useEffect, useState } from "react";
import {ItemType} from "@/GoalyTypes.js";
import axios from "axios";
import {BuyButton} from "@/Components/BuyButton.tsx";
import {ItemPostService} from "@/Services/ItemService.tsx";
import { useAuth0 } from "@auth0/auth0-react";

export const Shop = () => {

	const [currentItem, setCurrentItem] = useState<ItemType>();
	//const [itemsOwned, setItemsOwned] = useState(itemsOwnedService);
	const [items, setItems] = useState([]);
	const { user } = useAuth0();

	const onBuyButtonClick = (item_id: number) => {
		//const newItemsOwned = [...itemsOwned, currentItem];
		//setItemsOwned(newItemsOwned);
		//ItemPostService(user.userId, item_id);
	};


	useEffect(() => {
		console.log("Shop Rerendered.");
	});

		useEffect(() => {
			const getItems= async () => {
				const itemsRes = await axios.get("http://localhost:8080/items");
				return itemsRes.data;
			};

			getItems().then(setItems);
		}, []);

		return (
			<div>
				<h2>Items:</h2>
				{items ? (
					<ul>
						{items.map((item: { id: number; name: string; price: number; description: string }) => (
							<li key={item.name}>
								{" "}
								{item.description} - {item.price}{" "}
								<BuyButton
									item_id={item.id}
									onBuyButtonClick={onBuyButtonClick}
								/>
							</li>
						))}
					</ul>
				) : null}
			</div>
		);
};

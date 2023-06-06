/*
 ** Hooks—functions starting with `use`—can only be called at the top level of your components
 * or [your own Hooks.](https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks)**
 * You can’t call Hooks inside conditions, loops, or other nested functions. Hooks are functions,
 * but it’s helpful to think of them as unconditional declarations about your component’s needs.
 * You “use” React features at the top of your component similar to how you “import” modules
 * at the top of your file.
 */
import {useAuth0} from "@auth0/auth0-react";
import { useState } from "react";

export type buyButtonProps = {
	item_id: number,
	onBuyButtonClick: () => void,
}

export const BuyButton = (props) => {
	const { item_id, onBuyButtonClick } = props;
	
	return (
		<button
			onClick={() => {
				onBuyButtonClick(item_id);
			}}
		>
		</button>
	);
};

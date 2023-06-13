export type buyButtonProps = {
	item_id: number;
	price: number;
	onBuyButtonClick: (item_id, price) => void;
}

export const BuyButton = (props: buyButtonProps) => {
	const { item_id, price, onBuyButtonClick } = props;
	
	return (
		<button
			onClick={() => {
				onBuyButtonClick(item_id, price);
				
			}}
		> Buy
		</button>
	);
};

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
			className="btn-sm bg-sky-600 rounded-lg text-orange-200 hover:bg-orange-200 hover:text-black"
		> Buy
		</button>
	);
};

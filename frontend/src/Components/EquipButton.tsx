export type equipButtonProps = {
	item_id: number;
	onEquipButtonClick: (item_id) => void;
}

export const EquipButton = (props: equipButtonProps) => {
	const { item_id, onEquipButtonClick } = props;
	
	return (
		<button
			onClick={() => {
				onEquipButtonClick(item_id);
			}}
			className="btn-sm bg-sky-600 rounded-lg text-orange-200 hover:bg-orange-200 hover:text-black"
		> Equip
		</button>
	);
};

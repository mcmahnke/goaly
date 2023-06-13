

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
		> Equip
		</button>
	);
};

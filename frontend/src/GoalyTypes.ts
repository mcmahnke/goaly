export type State = {
	currentProfile: ProfileType
	itemsOwned: Array<ItemType>,
}

export type ProfileType = {
	name: string,
	id: number,
	wins: number,
	spendable: number,
}

export type ItemType = {
	name: string,
	id: number,
	price: number,
	description: string
}

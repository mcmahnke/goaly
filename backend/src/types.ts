export type ICreateUsersBody = {
	name: string,
	email: string,
	wins: number,
	spendable: number,
	equipped: number,
}

//name: "Gamer",
// 			email: "email@email.com",
// 			password: hashedPw,
// 			wins: 0,
// 			spendable: 0,
// 			role: UserRole.ADMIN,

export type IUpdateUsersBody = {
	email: string,
	name: string,
	wins: number,
	spendable: number,
	equipped: number,
}

export type ICreateItemBody = {
	name: string,
	price: number,
	description: string,
}

export type IUpdateItemBody = {
	id: number,
	name: string,
	price: number,
	description: string
}

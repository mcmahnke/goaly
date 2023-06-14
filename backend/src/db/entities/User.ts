import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { GoalyBaseEntity } from "./GoalyBaseEntity.js";
import { Enum } from "@mikro-orm/core";
import { Item } from "./Item.js";
import {ItemsOwned} from "./ItemsOwned.js";

export enum UserRole {
	ADMIN = 'Admin',
	USER = 'User'
}

@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users"})
export class User extends GoalyBaseEntity {
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string
	
	@Property()
	wins!: number;
	
	@Property()
	spendable!: number;
	
	@Property()
	equipped!: number;
	
	@Enum(() => UserRole)
	role!: UserRole; // string enum
	
	// Note that these DO NOT EXIST in the database itself!
	
	@OneToMany(
		() => ItemsOwned,
		item => item.owned_by,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	items_owned!: Collection<Item>;
}

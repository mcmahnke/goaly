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

// https://github.com/TheNightmareX/mikro-orm-soft-delete
// Yes, it's really that easy.
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
/*	@OneToMany(
		() => Shop,
		match => match.owner,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	matches!: Collection<Shop>;

	@OneToMany(
		() => Shop,
		match => match.matchee,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	matched_by!: Collection<Shop>;

	// Orphan removal used in our Delete All Sent Messages route to single-step remove via Collection
	@OneToMany(
		() => Message,
		message => message.sender,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_sent!: Collection<Message>;

	@OneToMany(
		() => Message,
		message => message.receiver,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_received!: Collection<Message>;

 */
}

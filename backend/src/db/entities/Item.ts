import {Entity, Property, ManyToOne, Cascade, Collection, ManyToMany, OneToMany} from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref, Rel} from "@mikro-orm/core";
import { GoalyBaseEntity } from "./GoalyBaseEntity.js";
import { User } from "./User.js";
import {SoftDeletable} from "mikro-orm-soft-delete";
import {ItemsOwned} from "./ItemsOwned.js";

@SoftDeletable(() => Item, "deleted_at", () => new Date())
@Entity()
export class Item extends GoalyBaseEntity {

	@Property()
	name!: string;

	@Property()
	price!: number;

	@Property()
	description!: string;

	@OneToMany(
		() => ItemsOwned,
		item => item.item,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	owned_by!: Collection<User>;
}

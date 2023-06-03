import { Entity, Property, ManyToOne, Cascade } from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref, Rel} from "@mikro-orm/core";
import { GoalyBaseEntity } from "./GoalyBaseEntity.js";
import { User } from "./User.js";

@Entity()
export class Message extends GoalyBaseEntity {

	// The person who performed the match/swiped right
	@ManyToOne()
	sender!: Ref<User>;

	// The account whose profile was swiped-right-on
	@ManyToOne('User')
	receiver!: Rel<User>;

	@Property()
	message!: string;
}

import { Entity, ManyToOne } from "@mikro-orm/core";
import type { Ref, Rel } from "@mikro-orm/core";
import {GoalyBaseEntity} from "./GoalyBaseEntity.js";
import {User} from "./User.js";
import {Item} from "./Item.js";


@Entity()
export class ItemsOwned {
    @ManyToOne({ primary: true })
    owned_by!: Ref<User>;

    @ManyToOne({ primary: true })
    item!: Rel<Item>;

}

import { BaseEntity, PrimaryKey, Property } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";

@SoftDeletable(() => GoalyBaseEntity, "deleted_at", () => new Date())
export class GoalyBaseEntity extends BaseEntity<GoalyBaseEntity, "id"> {
  @PrimaryKey()
	id!: number;
	
	@Property()
	created_at = new Date();
	
	@Property({onUpdate: () => new Date()})
	updated_at = new Date();

	@Property({ nullable: true })
	deleted_at?: Date;
}

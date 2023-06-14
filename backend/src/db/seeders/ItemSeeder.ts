import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Item } from "../entities/Item.js";
import {User} from "../entities/User.js";

export class ItemSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const itmRepo = em.getRepository(Item);

		// https://mikro-orm.io/docs/seeding#shared-context

		itmRepo.create({
			name: "Red",
			price: 2,
			description: "A rad red color",
		});
		itmRepo.create({
			name: "Orange",
			price: 2,
			description: "A rad orange color",
		});
		itmRepo.create({
			name: "Yellow",
			price: 2,
			description: "A rad yellow color",
		});
		itmRepo.create({
			name: "Green",
			price: 2,
			description: "A rad green color",
		});
		itmRepo.create({
			name: "Blue",
			price: 2,
			description: "A rad blue color",
		});
		itmRepo.create({
			name: "Purple",
			price: 2,
			description: "A rad purple color",
		});

	}
}

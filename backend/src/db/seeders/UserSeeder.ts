import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";
import bcrypt from "bcrypt";


export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const hashedPw = await bcrypt.hash("password", 10);

		// https://mikro-orm.io/docs/seeding#shared-context
		context.user1 = em.create(User, {
			name: "Gamer",
			email: "email@email.com",
			password: hashedPw,
			wins: 0,
			spendable: 0,
			role: UserRole.USER,
		});

		context.user2 = em.create(User, {
			name: "Gamer2",
			email: "email2@email.com",
			password: hashedPw,
			wins: 10,
			spendable: 10,
			role: UserRole.USER,
		});

		context.user3 = em.create(User, {
			name: "Gamer3",
			email: "email3@email.com",
			password: hashedPw,
			wins: 2,
			spendable: 2,
			role: UserRole.USER,
		});

		context.user4 = em.create(User, {
			name: "Gamer4",
			email: "email4@email.com",
			password: hashedPw,
			wins: 4,
			spendable: 4,
			role: UserRole.ADMIN,
		});
	}
}

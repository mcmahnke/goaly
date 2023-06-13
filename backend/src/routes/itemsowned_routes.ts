import { FastifyInstance } from "fastify";
import { Item } from "../db/entities/Item.js";
import { User } from "../db/entities/User.js";
import {ItemsOwned} from "../db/entities/ItemsOwned.js";


export function ItemsOwnedRoutesInit(app: FastifyInstance) {
// CREATE MATCH ROUTE
	/* Refactor - note our change to getReference!

	 getReference/getReference retrieves an entity by its primary key, but it does not actually fetch
	 the entity from the database until you attempt to access its properties. This is used when
	 you just need a reference to an entity in order to establish a relationship with another entity.
	 */
	app.post<{ Body: { email: string; item_id: number } }>("/items/owned", async (req, reply) => {
		const { email, item_id } = req.body;

		try {
			const user = await req.em.findOneOrFail(User, { email: email }, { strict: true });
			const id = user.id;
			const owned_by = await req.em.getReference(User, id);
			// do the same for the matcher/owner
			const item = await req.em.getReference(Item, item_id);

			const newItemOwned = await req.em.create(ItemsOwned, {
				owned_by,
				item,
			});

			//persist it to the database
			await req.em.flush();
			return reply.send(newItemOwned);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});

	app.search<{ Body: { email: string } }>("/items/owned", async (req, reply) => {
		const { email } = req.body;

		try {
			const user = await req.em.findOneOrFail(User, { email: email }, { strict: true });
			const ownerEntity = await req.em.getReference(User, user.id);
			const items = await req.em.find(ItemsOwned, { owned_by: ownerEntity });
			return reply.send(items);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});
}

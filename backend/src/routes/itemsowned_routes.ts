import { FastifyInstance } from "fastify";
import { Item } from "../db/entities/Item.js";
import { User } from "../db/entities/User.js";
import {ItemsOwned} from "../db/entities/ItemsOwned";


export function MatchRoutesInit(app: FastifyInstance) {
// CREATE MATCH ROUTE
	/* Refactor - note our change to getReference!

	 getReference/getReference retrieves an entity by its primary key, but it does not actually fetch
	 the entity from the database until you attempt to access its properties. This is used when
	 you just need a reference to an entity in order to establish a relationship with another entity.
	 */
	app.post<{ Body: { user_id: number; item_id: number } }>("/itemowned", async (req, reply) => {
		const { user_id, item_id } = req.body;

		try {
			const user = await req.em.getReference(User, user_id);
			// do the same for the matcher/owner
			const item = await req.em.getReference(Item, item_id);

			//create a new match between them
			const newItemOwned = await req.em.create(ItemsOwned, {
				user,
				item,
			});

			//persist it to the database
			await req.em.flush();
			// send the match back to the user
			return reply.send(newItemOwned);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});
}

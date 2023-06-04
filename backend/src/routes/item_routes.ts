import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Item } from "../db/entities/Item.js";
import {User, UserRole} from "../db/entities/User.js";
import {ICreateItemBody, IUpdateItemBody} from "../types.js";
import {SOFT_DELETABLE_FILTER} from "mikro-orm-soft-delete";


export function ItemRoutesInit(app: FastifyInstance) {

	// Route that returns all users, soft deleted and not
	app.get("/dbTestItem", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(Item, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/items",
		async (req, reply) => {
			try {
				const theItem = await req.em.find(Item, {});
				reply.send(theItem);
			} catch (err) {
				reply.status(500).send(err);
			}
		});

	// User CRUD
	// Refactor note - We DO use email still for creation!  We can't know the ID yet
	app.post<{ Body: ICreateItemBody }>("/items", async (req, reply) => {
		const { name, price, description } = req.body;

		try {
			const newItem = await req.em.create(Item, {
				name,
				price,
				description
			});

			await req.em.flush();
			return reply.send(newItem);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//READ
	app.search("/items", async (req, reply) => {
		const { id } = req.body;

		try {
			const theItem= await req.em.findOneOrFail(Item, id, {strict: true});
			reply.send(theItem);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// UPDATE
	app.put<{ Body: IUpdateItemBody }>("/items", async (req, reply) => {
		const { id, name, price, description } = req.body;

		const itemToChange = await req.em.findOneOrFail(Item, id, {strict: true});
		itemToChange.name = name;
		itemToChange.price = price;
		itemToChange.description = description;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(itemToChange);
	});

	// DELETE
	app.delete<{ Body: { my_id: number; id_to_delete: number, password: string } }>("/items", async (req, reply) => {
		const { my_id, id_to_delete, password } = req.body;

		try {
			// Authenticate my user's role
			const me = await req.em.findOneOrFail(User, my_id, {strict: true});
			// Check passwords match
			if (me.password !== password) {
				return reply.status(401).send();
			}

			// Make sure the requester is an Admin
			if (me.role === UserRole.USER) {
				return reply.status(401).send({ "message": "You are not an admin!"})
			}

			const itemToDelete = await req.em.findOneOrFail(Item, id_to_delete, {strict: true});

			await req.em.remove(itemToDelete).flush();
			return reply.send(itemToDelete);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});


}

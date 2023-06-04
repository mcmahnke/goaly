import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Item } from "../db/entities/Item.js";
import { User } from "../db/entities/User.js";
import { ICreateItemBody } from "../types.js";
import {SOFT_DELETABLE_FILTER} from "mikro-orm-soft-delete";


export function ItemRoutesInit(app: FastifyInstance) {

	// Route that returns all users, soft deleted and not
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(Item, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/items",
		{ onRequest: [app.auth]},
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
	app.post<{ Body: ICreateItemBody }>("/users", async (req, reply) => {
		const { name, price, description } = req.body;

		try {
			const hashedPw = await bcrypt.hash(password, 10);
			const newUser = await req.em.create(User, {
				name,
				email,
				password: hashedPw,
				wins,
				spendable,
				// We'll only create Admins manually!
				role: UserRole.USER
			});

			await req.em.flush();
			return reply.send(newUser);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//READ
	app.search("/users", async (req, reply) => {
		const { id } = req.body;

		try {
			const theUser = await req.em.findOneOrFail(User, id, {strict: true});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// UPDATE
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { name, id, wins, spendable} = req.body;

		const userToChange = await req.em.findOneOrFail(User, id, {strict: true});
		userToChange.name = name;
		userToChange.wins = wins;
		userToChange.spendable = spendable;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});

	// DELETE
	app.delete<{ Body: { my_id: number; id_to_delete: number, password: string } }>("/users", async (req, reply) => {
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

			const theUserToDelete = await req.em.findOneOrFail(User, id_to_delete, {strict: true});

			//Make sure the to-be-deleted user isn't an admin
			if (theUserToDelete.role === UserRole.ADMIN) {
				return reply.status(401).send({ "message": "You do not have enough privileges to delete an Admin!"})
			}

			await req.em.remove(theUserToDelete).flush();
			return reply.send(theUserToDelete);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});


}

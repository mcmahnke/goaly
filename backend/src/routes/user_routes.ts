import bcrypt from "bcrypt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateUsersBody, IUpdateUsersBody } from "../types.js";

export function UserRoutesInit(app: FastifyInstance) {
	// Route that returns all users, soft deleted and not
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/users",
		async (req, reply) => {
		try {
			const theUser = await req.em.find(User, {});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// User CRUD
	app.post<{ Body: ICreateUsersBody }>("/users", async (req, reply) => {
		const { name, email, wins, spendable, equipped } = req.body;

		try {
			const newUser = await req.em.create(User, {
				name,
				email,
				wins,
				spendable,
				equipped,
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
		const { email } = req.body;

		try {
			const theUser = await req.em.findOneOrFail(User, { email: email }, {strict: true});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// UPDATE
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { email, name, wins, spendable, equipped} = req.body;

		const userToChange = await req.em.findOneOrFail(User, { email: email }, {strict: true});
		userToChange.name = name;
		userToChange.wins = wins;
		userToChange.spendable = spendable;
		userToChange.equipped = equipped;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});

	// DELETE
	app.delete<{ Body: { my_id: number; id_to_delete: number} }>("/users", async (req, reply) => {
		const { my_id, id_to_delete} = req.body;

		try {
			const me = await req.em.findOneOrFail(User, my_id, {strict: true});

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

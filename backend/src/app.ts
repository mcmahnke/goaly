import Fastify from "fastify";
import cors from '@fastify/cors'
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import GoalyRoutes from "./routes/routes.js";
import config from "./db/mikro-orm.config.js";

const envToLogger = {
	development: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "debug",
	},
	production: {
		level: "error"
	},
	test: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "warn"
	},
};

const app = Fastify({
	logger: envToLogger[process.env.NODE_ENV]
});

await app.register(cors, {
	origin: (origin, cb) => {
		cb(null, true);
	},
	methods:
		['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'SEARCH'],
});

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin, {});
await app.register(import("fastify-auth0-verify"), {
	domain: "dev-jgk07h16kswx1avk.us.auth0.com",
	secret: "S6LtXBles2Qv-B-9jvhglYoUaFmLBOPzMtdPT81kQi4Knkyyzilltl4ATf0Gaz0x"
	//For some reason could not include the domain and secret values as env variables, would crash my docker compose
});
await app.register(GoalyRoutes, {});


export default app;

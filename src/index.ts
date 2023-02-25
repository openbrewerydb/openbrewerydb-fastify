import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context.js";
import { appRouter } from "./router.js";

const environment = process.env.NODE_ENV || "development";
const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const server = fastify({
  maxParamLength: 5000,
  logger: envToLogger[environment] ?? true,
});

server.register(fastifyTRPCPlugin, {
  prefix: "/v1",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    const address = await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();

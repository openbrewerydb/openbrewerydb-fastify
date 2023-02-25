import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context.js";
import { appRouter } from "./router.js";

const server = fastify({
  maxParamLength: 5000,
});

server.register(fastifyTRPCPlugin, {
  prefix: "/v1",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    const address = await server.listen({ port: 3000 });
    console.log(`Server listening at ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();

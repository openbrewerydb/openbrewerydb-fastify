import fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong";
});

// This loads all plugins defined in plugins
server.register(AutoLoad, {
  dir: path.join(__dirname, "plugins"),
  options: {},
});

// This loads all plugins defined in routes
server.register(AutoLoad, {
  dir: path.join(__dirname, "routes"),
  options: {},
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

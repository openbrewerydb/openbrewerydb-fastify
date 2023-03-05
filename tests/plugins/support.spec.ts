import { test, expect } from "@playwright/test";
import Fastify from "fastify";
import Support from "../../src/plugins/support.js";

test("support works standalone", async () => {
  const fastify = Fastify();
  fastify.register(Support);

  await fastify.ready();
  // @ts-expect-error
  expect(fastify.someSupport()).toBe("hugs");
});

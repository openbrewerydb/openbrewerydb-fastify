import { test } from "uvu";
import * as assert from "uvu/assert";
import Fastify from "fastify";
import Support from "../../src/plugins/support.js";

test("support works standalone", async () => {
  const fastify = Fastify();
  fastify.register(Support);

  await fastify.ready();
  // @ts-expect-error
  assert.equal(fastify.someSupport(), "hugs");
});

test.run();

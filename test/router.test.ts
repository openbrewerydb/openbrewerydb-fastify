import { test } from "uvu";
import * as assert from "uvu/assert";
import { client } from "./helpers.js";

test("breweries route returns breweries", async () => {
  const testClient = client();
  const result = await testClient.get("v1/breweries");
  const body = JSON.parse(result.body);
  assert.ok(body?.result?.data?.length);
});

test.run();

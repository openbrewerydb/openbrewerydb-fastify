import { test } from "uvu";
import * as assert from "uvu/assert";
import { client } from "./helpers.js";

test("breweries route", async () => {
  const testClient = client();
  const result = await testClient.get("v1/breweries");
  const expected = { result: { data: {} } };
  assert.equal(JSON.parse(result.body), expected);
});

test.run();

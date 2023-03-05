import { test, expect } from "@playwright/test";

test("should return breweries", async ({ request }) => {
  const response = await request.get(`/v2/breweries`);
  expect(response.ok()).toBeTruthy();

  const breweries = (await response.json()).result.data;
  console.log("Brewery length: ", breweries.length);
  expect(breweries.length).toBeGreaterThan(0);
});

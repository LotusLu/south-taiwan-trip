import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static itinerary contains the trip title and all four day controls", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /中南部/);
  assert.match(html, /四天三夜小旅行/);
  for (const day of ["01", "02", "03", "04"]) assert.match(html, new RegExp(day));
});

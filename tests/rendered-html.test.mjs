import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static itinerary contains the trip title and all four day controls", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(html, /中南部/);
  assert.match(html, /四天三夜小旅行/);
  assert.match(html, /神農街夜間漫步/);
  assert.match(html, /<strong>23<\/strong> 站/);
  for (const image of [
    "yongle-market.jpg",
    "helmet-shop.jpg",
    "heart-guesthouse.jpg",
    "wenzhang-beef-soup.jpg",
    "luzao-tableware.jpg",
    "28-the-loft.jpg",
    "sweet-moon-gelato.jpg",
    "explore-hotel.jpg",
    "laojing-bbq.jpg",
    "noodle-lunch.jpg",
  ]) assert.match(source, new RegExp(image));
  for (const day of ["01", "02", "03", "04"]) assert.match(html, new RegExp(day));
});

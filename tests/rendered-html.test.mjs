import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static itinerary contains the trip title and all four day controls", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(html, /中南部/);
  assert.match(html, /四天三夜小旅行/);
  assert.match(html, /神農街夜間漫步/);
  assert.match(html, /溫體牛・法老展・古城夜色/);
  assert.match(html, /湖東牛肉館・午餐/);
  assert.match(html, /奇美博物館・《埃及之王：法老》/);
  assert.doesNotMatch(html, /國立臺灣歷史博物館/);
  assert.match(html, /<strong>23<\/strong> 站/);
  assert.match(source, /theme: "化石探險・選物・花園夜市"/);
  assert.equal(source.match(/title: "台南花園夜市"/g)?.length, 1);
  for (const image of [
    "yongle-market.jpg",
    "hudong-beef.jpg",
    "chimei-pharaoh.jpg",
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

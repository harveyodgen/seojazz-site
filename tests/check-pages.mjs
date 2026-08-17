import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pagesDir = join(root, "pages");

test("index.html exists and is Russian", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  assert.match(html, /lang="ru"/);
  assert.match(html, /<title>/);
  assert.doesNotMatch(html, /<h3>URL:<\/h3>/);
});

test("css and js assets exist", () => {
  assert.ok(existsSync(join(root, "css/styles.css")));
  assert.ok(existsSync(join(root, "js/main.js")));
});

test("pages directory has landings", () => {
  const files = readdirSync(pagesDir).filter((f) => f.endsWith(".html"));
  assert.ok(files.length >= 5, `expected >=5 pages, got ${files.length}`);
});

test("no SEO-brief URL cards left in pages", () => {
  const files = readdirSync(pagesDir).filter((f) => f.endsWith(".html"));
  const bad = [];
  for (const f of files) {
    const html = readFileSync(join(pagesDir, f), "utf8");
    if (html.includes("<h3>URL:</h3>") || html.includes("Интент:")) {
      bad.push(f);
    }
  }
  assert.equal(bad.length, 0, `brief leftovers: ${bad.slice(0, 5).join(", ")}`);
});

test("key pages exist", () => {
  for (const f of ["uslugi.html", "ai-seo.html", "cms.html", "tariffs.html", "cases.html"]) {
    assert.ok(existsSync(join(pagesDir, f)), `missing ${f}`);
  }
});

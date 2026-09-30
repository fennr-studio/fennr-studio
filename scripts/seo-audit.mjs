#!/usr/bin/env node
/**
 * SEO health crawl.
 *
 *   npm run seo:audit                       # crawls http://localhost:3000
 *   npm run seo:audit -- https://www.fennrstudio.com
 *   npm run seo:audit -- http://localhost:3000 --strict   # exit 1 on errors
 *
 * Starts from `/` plus every <loc> in sitemap.xml, follows internal <a href>s,
 * and checks each HTML page for the things that quietly break search: status,
 * title/description presence and uniqueness, canonical, H1 count, robots,
 * JSON-LD validity, Open Graph, internal inlinks (orphans), image alt/size and
 * broken internal links. Writes seo-report/report.json and report.csv.
 *
 * Canonicals and sitemap URLs point at production (SITE_URL). When crawling a
 * local server they are compared by path, not by host.
 */
import { parse } from "node-html-parser";
import { mkdirSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const BASE = (args.find((a) => /^https?:\/\//.test(a)) || "http://localhost:3000").replace(/\/$/, "");
const STRICT = args.includes("--strict");
const PROD = "https://www.fennrstudio.com";
const MAX_PAGES = 500;

const toPath = (href) => {
  try {
    const u = new URL(href, BASE);
    const host = u.host.replace(/^www\./, "");
    const local = [new URL(BASE).host.replace(/^www\./, ""), "fennrstudio.com"];
    if (!local.includes(host)) return null;
    return u.pathname.replace(/(.)\/$/, "$1") || "/";
  } catch {
    return null;
  }
};

const pages = new Map(); // path -> result
const inlinks = new Map(); // path -> Set(from)
const queue = ["/"];
const seen = new Set(queue);

async function fetchText(url) {
  const res = await fetch(url, { redirect: "manual", headers: { "user-agent": "fennr-seo-audit" } });
  return { status: res.status, location: res.headers.get("location"), type: res.headers.get("content-type") || "", body: res.status < 300 ? await res.text() : "" };
}

// Seed from the sitemap.
let sitemapPaths = [];
{
  const sm = await fetchText(`${BASE}/sitemap.xml`);
  if (sm.status !== 200) console.error(`! sitemap.xml returned ${sm.status}`);
  sitemapPaths = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => toPath(m[1])).filter(Boolean);
  for (const p of sitemapPaths) if (!seen.has(p)) (seen.add(p), queue.push(p));
}
const robotsTxt = (await fetchText(`${BASE}/robots.txt`)).body;

while (queue.length && pages.size < MAX_PAGES) {
  const path = queue.shift();
  const r = await fetchText(BASE + path);
  const page = { url: path, status: r.status, issues: [] };
  pages.set(path, page);

  if (r.status >= 300 && r.status < 400) {
    page.redirect = r.location;
    continue;
  }
  if (r.status !== 200 || !r.type.includes("text/html")) continue;

  const root = parse(r.body, { comment: false });
  const head = root.querySelector("head");
  const meta = (sel) => head?.querySelector(sel)?.getAttribute("content")?.trim() || "";

  page.title = head?.querySelector("title")?.text.trim() || "";
  page.description = meta('meta[name="description"]');
  page.canonical = head?.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
  page.robots = meta('meta[name="robots"]');
  page.h1 = root.querySelectorAll("h1").map((h) => h.text.replace(/\s+/g, " ").trim());
  page.ogTitle = meta('meta[property="og:title"]');
  page.ogImage = meta('meta[property="og:image"]');
  page.ogUrl = meta('meta[property="og:url"]');

  const main = root.querySelector("main") || root.querySelector("body");
  page.words = (main?.text || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;

  page.schema = [];
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const j = JSON.parse(s.text);
      const nodes = Array.isArray(j) ? j : j["@graph"] ? j["@graph"] : [j];
      for (const n of nodes) page.schema.push([].concat(n["@type"]).join("/"));
    } catch (e) {
      page.issues.push(["error", `invalid JSON-LD: ${e.message}`]);
    }
  }

  page.imagesMissingAlt = 0;
  page.imagesMissingSize = 0;
  for (const img of root.querySelectorAll("img")) {
    if (!img.hasAttribute("alt")) page.imagesMissingAlt++;
    if (!(img.getAttribute("width") && img.getAttribute("height")) && !/position:\s*absolute/.test(img.getAttribute("style") || "")) page.imagesMissingSize++;
  }

  page.outlinks = 0;
  for (const a of root.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href");
    if (/^(mailto|tel|javascript|#)/.test(href)) continue;
    const p = toPath(href);
    if (!p || p.startsWith("/_next")) continue;
    page.outlinks++;
    if (p !== path) {
      if (!inlinks.has(p)) inlinks.set(p, new Set());
      inlinks.get(p).add(path);
    }
    if (!/text/.test(a.text) && !a.text.trim() && !a.getAttribute("aria-label") && !a.querySelector("img[alt]") && !a.querySelector(".sr-only"))
      page.issues.push(["warn", `link without accessible text → ${href}`]);
    if (!seen.has(p) && !/\.(jpg|jpeg|png|webp|avif|svg|pdf|xml|txt|ico)$/i.test(p)) {
      seen.add(p);
      queue.push(p);
    }
  }
}

// ---- Checks ---------------------------------------------------------------
const html = [...pages.values()].filter((p) => p.status === 200 && p.title !== undefined);
const indexable = html.filter((p) => !/noindex/i.test(p.robots));
const dupes = (key) => {
  const m = new Map();
  for (const p of indexable) if (p[key]) m.set(p[key], [...(m.get(p[key]) || []), p.url]);
  return [...m.values()].filter((v) => v.length > 1);
};

for (const p of pages.values()) {
  if (p.status >= 400) {
    const from = [...(inlinks.get(p.url) || [])];
    p.issues.push(["error", `HTTP ${p.status}${from.length ? ` (linked from ${from.slice(0, 3).join(", ")})` : ""}`]);
  }
  if (p.status >= 300 && p.status < 400) {
    const from = [...(inlinks.get(p.url) || [])];
    if (from.length) p.issues.push(["warn", `internal link to redirect → ${p.redirect} (from ${from.slice(0, 3).join(", ")})`]);
  }
}
for (const p of indexable) {
  const e = (m) => p.issues.push(["error", m]);
  const w = (m) => p.issues.push(["warn", m]);
  if (!p.title) e("missing <title>");
  else if (p.title.length > 65) w(`title ${p.title.length} chars (may truncate)`);
  if (!p.description) e("missing meta description");
  else if (p.description.length > 165) w(`description ${p.description.length} chars`);
  else if (p.description.length < 70) w(`description only ${p.description.length} chars`);
  if (!p.canonical) e("missing canonical");
  else if (toPath(p.canonical) !== p.url) e(`canonical points elsewhere → ${p.canonical}`);
  else if (!p.canonical.startsWith(PROD)) e(`canonical not on ${PROD} → ${p.canonical}`);
  if (p.h1.length === 0) e("no <h1>");
  if (p.h1.length > 1) e(`${p.h1.length} <h1>s: ${p.h1.join(" | ")}`);
  if (!p.ogTitle) w("missing og:title");
  if (!p.ogImage) w("missing og:image");
  if (p.ogUrl && toPath(p.ogUrl) !== p.url) w(`og:url mismatch → ${p.ogUrl}`);
  if (!p.schema.length) w("no JSON-LD");
  if (p.imagesMissingAlt) e(`${p.imagesMissingAlt} <img> without alt`);
  if (p.words < 250) w(`thin: ${p.words} words in <main>`);
  if (p.url !== "/" && !inlinks.has(p.url)) e("orphan: no internal links point here");
  if (!sitemapPaths.includes(p.url)) w("indexable but not in sitemap");
}
for (const group of dupes("title")) for (const u of group) pages.get(u).issues.push(["error", `duplicate title with ${group.filter((x) => x !== u).join(", ")}`]);
for (const group of dupes("description")) for (const u of group) pages.get(u).issues.push(["error", `duplicate description with ${group.filter((x) => x !== u).join(", ")}`]);
for (const sp of sitemapPaths) {
  const p = pages.get(sp);
  if (!p || p.status !== 200) (p || { issues: [] }).issues.push(["error", `in sitemap but returns ${p?.status}`]);
  else if (/noindex/i.test(p.robots)) p.issues.push(["error", "in sitemap but noindex"]);
}
const siteIssues = [];
if (!/Sitemap:\s*https:\/\/www\.fennrstudio\.com\/sitemap\.xml/i.test(robotsTxt)) siteIssues.push(["error", "robots.txt missing sitemap declaration"]);
if (/Disallow:\s*\/\s*$/m.test(robotsTxt)) siteIssues.push(["error", "robots.txt disallows everything"]);
if (/Disallow:\s*\/_next/m.test(robotsTxt)) siteIssues.push(["error", "robots.txt blocks /_next (CSS/JS)"]);
{
  const nf = await fetchText(`${BASE}/this-page-should-not-exist-${Date.now()}`);
  if (nf.status !== 404) siteIssues.push(["error", `unknown URL returns ${nf.status}, expected 404`]);
}

// ---- Output ---------------------------------------------------------------
const rows = [...pages.values()].sort((a, b) => a.url.localeCompare(b.url));
mkdirSync("seo-report", { recursive: true });
writeFileSync("seo-report/report.json", JSON.stringify({ base: BASE, crawledAt: new Date().toISOString(), siteIssues, pages: rows.map((p) => ({ ...p, inlinks: [...(inlinks.get(p.url) || [])] })) }, null, 2));
const cols = ["url", "status", "title", "description", "canonical", "h1", "robots", "words", "schema", "ogImage", "inlinks", "outlinks", "imagesMissingAlt", "issues"];
const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
writeFileSync(
  "seo-report/report.csv",
  [cols.join(","), ...rows.map((p) => cols.map((c) => esc(c === "inlinks" ? inlinks.get(p.url)?.size || 0 : c === "issues" ? p.issues.map((i) => i.join(": ")).join(" | ") : Array.isArray(p[c]) ? p[c].join(" | ") : p[c])).join(","))].join("\n"),
);

let errors = siteIssues.filter((i) => i[0] === "error").length;
let warns = siteIssues.length - errors;
console.log(`\nSEO audit — ${BASE} — ${rows.length} URLs (${indexable.length} indexable HTML)\n`);
for (const [lvl, m] of siteIssues) console.log(`  ${lvl === "error" ? "✗" : "·"} [site] ${m}`);
for (const p of rows) {
  const tag = `${p.status} ${p.url}`;
  if (!p.issues.length) {
    console.log(`  ✓ ${tag}  (${p.title?.length ?? "-"}c title, ${p.h1?.length ?? "-"} h1, ${p.words ?? "-"}w, ${inlinks.get(p.url)?.size || 0} inlinks)`);
    continue;
  }
  console.log(`  ${p.issues.some((i) => i[0] === "error") ? "✗" : "·"} ${tag}`);
  for (const [lvl, m] of p.issues) {
    lvl === "error" ? errors++ : warns++;
    console.log(`      ${lvl === "error" ? "ERROR" : "warn "} ${m}`);
  }
}
console.log(`\n${errors} errors, ${warns} warnings. Report: seo-report/report.{json,csv}\n`);
if (STRICT && errors) process.exit(1);

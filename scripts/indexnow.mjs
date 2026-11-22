#!/usr/bin/env node
/**
 * Submits every URL in the deployed sitemap to IndexNow (Bing, Yandex, ChatGPT Search).
 *
 * Usage:
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs --dry-run
 */

const INDEXNOW_KEY = "7b4c9e2f8a1d4e6b9c3f5a2d8e1b4c7a";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecotechcore.com";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

const dryRun = process.argv.includes("--dry-run");
const host = new URL(SITE_URL).host;

async function sitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`GET ${SITE_URL}/sitemap.xml -> ${res.status}`);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function assertKeyFileLive() {
  const url = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Key file not reachable: ${url} -> ${res.status}`);
  }
  const body = (await res.text()).trim();
  if (body !== INDEXNOW_KEY) {
    throw new Error(
      `Key file body does not match key (got ${JSON.stringify(body)})`,
    );
  }
}

async function main() {
  await assertKeyFileLive();

  const urlList = await sitemapUrls();
  if (urlList.length === 0) {
    throw new Error("Sitemap contained no <loc> entries");
  }

  console.log(`${urlList.length} URLs from ${SITE_URL}/sitemap.xml`);
  for (const u of urlList) console.log("  " + u);

  if (dryRun) {
    console.log("\n--dry-run: nothing submitted.");
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow -> ${res.status} ${await res.text()}`);
  }
  console.log(`\nSubmitted. IndexNow responded ${res.status}.`);
}

main().catch((err) => {
  console.error("IndexNow submission failed:", err.message);
  process.exitCode = 1;
});

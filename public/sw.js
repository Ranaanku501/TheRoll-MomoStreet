/*
 * Service worker for The Roll & Momos.
 * Bump VERSION whenever this file changes so old caches are dropped.
 */
const VERSION = "v1";
const PAGE_CACHE = `trm-pages-${VERSION}`;
const ASSET_CACHE = `trm-assets-${VERSION}`;
const OFFLINE_URL = "/offline.html";

const PRECACHE = [OFFLINE_URL, "/icons/icon-192.png"];

const ASSET_PATTERN = /\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|woff2?)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(ASSET_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PAGE_CACHE && key !== ASSET_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/** Pages: fresh copy when online, last saved copy when not. */
async function pageStrategy(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(PAGE_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached =
      (await caches.match(request)) || (await caches.match(OFFLINE_URL));
    return cached ?? Response.error();
  }
}

/** Hashed assets: serve from cache, fall back to network. */
async function assetStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(ASSET_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(pageStrategy(request));
    return;
  }

  if (url.pathname.startsWith("/_next/static") || ASSET_PATTERN.test(url.pathname)) {
    event.respondWith(assetStrategy(request));
  }
});

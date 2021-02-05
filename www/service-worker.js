importScripts("/precache-manifest.tj0rv1nah4nar52vs8igd1r1.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.core.setCacheNameDetails({ prefix: 'd4' })

//Change this value every time before you build
const LATEST_VERSION = 'v1.0'
const CACHE_NAME = "offline";
// Customize this with a different URL if needed.
const OFFLINE_URL = "/index.html";

self.addEventListener('activate', (event) => {
  console.log(`%c ${LATEST_VERSION} `, 'background: #ddd; color: #0000ff')
  if (caches) {
    caches.keys().then((arr) => {
      arr.forEach((key) => {
        if (key.indexOf('d4-precache') < -1) {
          caches.delete(key).then(() => console.log(`%c Cleared ${key}`, 'background: #333; color: #ff0000'))
        } else {
          caches.open(key).then((cache) => {
            cache.match('version').then((res) => {
              if (!res) {
                cache.put('version', new Response(LATEST_VERSION, { status: 200, statusText: LATEST_VERSION }))
              } else if (res.statusText !== LATEST_VERSION) {
                caches.delete(key).then(() => console.log(`%c Cleared Cache ${LATEST_VERSION}`, 'background: #333; color: #ff0000'))
              } else console.log(`%c Great you have the latest version ${LATEST_VERSION}`, 'background: #333; color: #00ff00')
            })
          })
        }
      })
    })
  }
})

self.addEventListener("install", (event) => {
  console.log('SW install', event)
  // event.waitUntil(
  //   (async () => {
  //     const cache = await caches.open(CACHE_NAME);
  //     // Setting {cache: 'reload'} in the new request will ensure that the
  //     // response isn't fulfilled from the HTTP cache; i.e., it will be from
  //     // the network.
  //     await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
  //   })()
  // );
  // // Force the waiting service worker to become the active service worker.
  // self.skipWaiting();
});


self.addEventListener("fetch", (event) => {
  console.log('SW fetch', event)
  return;
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // First, try to use the navigation preload response if it's supported.
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Always try the network first.
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // catch is only triggered if an exception is thrown, which is likely
          // due to a network error.
          // If fetch() returns a valid HTTP response with a response code in
          // the 4xx or 5xx range, the catch() will NOT be called.
          console.log("Fetch failed; returning offline page instead.", error);

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
})

workbox.skipWaiting()
workbox.clientsClaim()

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})


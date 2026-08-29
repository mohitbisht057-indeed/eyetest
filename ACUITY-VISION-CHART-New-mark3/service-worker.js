const CACHE_NAME = 'vision-chart-v6';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icon.png',
  './js/core.js',
  './js/settings.js',
  './js/features/landolt.js',
  './js/features/tumbling.js',
  './js/features/alphabets.js',
  './js/features/numerics.js',
  './js/features/languages.js',
  './js/features/dots.js',
  './js/features/redgreen.js',
  './js/features/pediatric.js',
  './js/features/snellen.js',
  './js/features/logmar.js',
  './js/features/peripheral.js',
  './js/features/contrast.js',
  './js/features/misc.js',
  './js/features/ishihara.js',
  './js/features/astig.js',
  './js/features/educational.js',
  './icons/Pasted image.png',
  './icons/Pasted image (2).png',
  './icons/Pasted image (3).png',
  './icons/Pasted image (4).png',
  './icons/Pasted image (5).png',
  './icons/Pasted image (6).png',
  './icons/Pasted image (7).png',
  './icons/Pasted image (8).png',
  './icons/Pasted image (9).png'
];

// Install and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Remove old app caches after an update.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

// Always fetch a fresh copy while online, matching a hard refresh. The cache
// remains only as an offline fallback.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

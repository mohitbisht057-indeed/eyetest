const CACHE_NAME = 'vision-chart-v7';

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


// ================= INSTALL =================

self.addEventListener('install', event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())

  );

});


// ================= ACTIVATE =================

self.addEventListener('activate', event => {

  event.waitUntil(

    caches.keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))

        );

      })
      .then(() => self.clients.claim())

  );

});


// ================= FETCH =================

self.addEventListener('fetch', event => {

  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // Only handle this website
  if (url.origin !== self.location.origin) {
    return;
  }

  /*
   * JavaScript / CSS / HTML:
   * ALWAYS get the newest version from the server.
   */
  const isCodeFile =
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html');

  if (isCodeFile) {

    event.respondWith(

      fetch(event.request, {
        cache: 'no-store'
      })
        .then(response => {

          if (response.ok) {

            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, copy);
              });

          }

          return response;

        })
        .catch(() => {

          return caches.match(event.request);

        })

    );

    return;
  }


  /*
   * Images / other assets:
   * Network first, cache fallback.
   */
  event.respondWith(

    fetch(event.request)
      .then(response => {

        if (response.ok) {

          const copy = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, copy);
            });

        }

        return response;

      })
      .catch(() => {

        return caches.match(event.request);

      })

  );

});
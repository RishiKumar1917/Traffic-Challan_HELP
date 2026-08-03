// Traffic-Challan HELP - Service Worker for Offline-First Capability

const CACHE_NAME = 'traffic-help-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/rights-data.js',
  './js/judgements-data.js',
  './js/oem-components-data.js',
  './js/dispute-generator.js',
  './js/chatbot.js',
  './js/audio-speech.js',
  './js/ocr-scanner.js',
  './js/app.js',
  './docs/OFFICIAL_GOVT_CIRCULARS_INDEX.md',
  './docs/MoRTH_Circular_RT11036_64_2017_MV.html',
  './docs/Section_52_ARAI_Homologation_Proof.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Fallback for html pages offline
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});

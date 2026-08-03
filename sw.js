// Traffic-Challan HELP - Service Worker (Cache Refresh v6)

const CACHE_NAME = 'traffic-help-v6';
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
  './js/voice-analyzer.js',
  './js/app.js',
  './docs/OFFICIAL_GOVT_CIRCULARS_INDEX.html',
  './docs/MoRTH_Circular_RT11036_64_2017_MV.html',
  './docs/Section_52_ARAI_Homologation_Proof.html',
  './docs/Deep_dive.md'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});

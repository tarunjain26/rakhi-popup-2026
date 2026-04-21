// Service Worker for Rakhi Pop-Up 2026 PWA
// Auto-updates: when a new version is deployed, SW detects it and refreshes all clients

const CACHE_NAME = 'rakhi-popup-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// ── INSTALL: cache static assets ──
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  // Skip waiting immediately so new SW activates right away
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// ── ACTIVATE: clear old caches, claim clients ──
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => {
      // Take control of all open tabs immediately
      return self.clients.claim();
    })
  );
});

// ── FETCH: Network-first strategy ──
// Always tries network first so you get the latest version
// Falls back to cache if offline
self.addEventListener('fetch', event => {
  // Skip non-GET and Firebase/external requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('firebaseapp') ||
      event.request.url.includes('googleapis') ||
      event.request.url.includes('gstatic') ||
      event.request.url.includes('fonts.googleapis') ||
      event.request.url.includes('wa.me')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Got a fresh response — update cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline — serve from cache
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback to index.html for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// ── MESSAGE: force update from app ──
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

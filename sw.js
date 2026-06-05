/* ============================================================
   Portal do BPC — Service Worker
   Cache-first para assets estáticos, network-first para HTML
   ============================================================ */

const CACHE_NAME = 'pdbpc-v3';
const CACHE_STATIC = 'pdbpc-static-v3';

/* Assets que vão para cache imediatamente (install) */
const PRECACHE = [
  '/colors_and_type.css',
  '/styles.css',
  '/mobile-nav.js',
  '/assets/icon-whatsapp.svg',
  '/assets/logo-monograma-cc.png',
  '/assets/favicon.svg',
];

/* ---- Install: pré-cacheia assets críticos ---- */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_STATIC).then(function(cache) {
      return cache.addAll(PRECACHE);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

/* ---- Activate: limpa caches antigos ---- */
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME && k !== CACHE_STATIC; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* ---- Fetch: estratégia por tipo de recurso ---- */
self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  /* Só intercepta requests do próprio domínio */
  if (url.origin !== location.origin) return;

  /* HTML: network-first (sempre tenta buscar versão nova) */
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request).then(function(res) {
        var clone = res.clone();
        caches.open(CACHE_NAME).then(function(c) { c.put(e.request, clone); });
        return res;
      }).catch(function() {
        return caches.match(e.request).then(function(cached) {
          return cached || caches.match('/');
        });
      })
    );
    return;
  }

  /* CSS, JS: network-first para garantir versão nova sempre */
  if (['style', 'script'].includes(e.request.destination)) {
    e.respondWith(
      fetch(e.request).then(function(res) {
        var clone = res.clone();
        caches.open(CACHE_STATIC).then(function(c) { c.put(e.request, clone); });
        return res;
      }).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }

  /* Imagens e fontes: cache-first (mudam raramente) */
  if (['image', 'font'].includes(e.request.destination)) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        if (cached) return cached;
        return fetch(e.request).then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_STATIC).then(function(c) { c.put(e.request, clone); });
          return res;
        });
      })
    );
    return;
  }
});

/* ============================================================
   Portal do BPC — Service Worker v4
   Cache-first para assets estáticos, network-first para HTML
   Atualizado: 2026-06-09
   ============================================================ */

const CACHE_NAME    = 'pdbpc-v4';
const CACHE_STATIC  = 'pdbpc-static-v4';

/* Assets pré-cacheados imediatamente (install) */
const PRECACHE = [
  '/colors_and_type.css',
  '/styles.css',
  '/mobile-nav.js',
  '/assets/icon-whatsapp.svg',
  '/assets/logo-monograma-cc.png',
  '/assets/favicon.svg',
];

/* JS do app: network-first mas cacheável por versão */
const APP_SCRIPTS = [
  '/components.js',
  '/screens.js',
  '/blog-posts.js',
  '/app-main.js',
  '/mobile-patch.js',
  '/tweaks.js',
  '/fixes-b.js',
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
        keys
          .filter(function(k) { return k !== CACHE_NAME && k !== CACHE_STATIC; })
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

  /* Não intercepta requests POST ou outros métodos */
  if (e.request.method !== 'GET') return;

  /* HTML: network-first — sempre tenta buscar versão nova */
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(c) { c.put(e.request, clone); });
          return res;
        })
        .catch(function() {
          return caches.match(e.request).then(function(cached) {
            return cached || caches.match('/');
          });
        })
    );
    return;
  }

  /* JS do app (com ?v= versioning): network-first + cache */
  var isAppScript = APP_SCRIPTS.some(function(s) {
    return url.pathname === s;
  });
  if (isAppScript || e.request.destination === 'script') {
    e.respondWith(
      fetch(e.request)
        .then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_STATIC).then(function(c) { c.put(e.request, clone); });
          return res;
        })
        .catch(function() {
          return caches.match(e.request);
        })
    );
    return;
  }

  /* CSS: network-first */
  if (e.request.destination === 'style') {
    e.respondWith(
      fetch(e.request)
        .then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_STATIC).then(function(c) { c.put(e.request, clone); });
          return res;
        })
        .catch(function() {
          return caches.match(e.request);
        })
    );
    return;
  }

  /* Imagens e fontes: cache-first — mudam raramente */
  if (e.request.destination === 'image' || e.request.destination === 'font') {
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

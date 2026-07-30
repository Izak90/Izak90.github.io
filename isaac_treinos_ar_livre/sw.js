const CACHE_NAME = 'isaac-treinos-pwa-v1';
const CACHE_ASSETS = [
  '/isaac_treinos_ar_livre/',
  '/isaac_treinos_ar_livre/index.html',
  '/isaac_treinos_ar_livre/comunidade.html',
  '/isaac_treinos_ar_livre/comecar.html',
  '/isaac_treinos_ar_livre/treino-experimental.html',
  '/isaac_treinos_ar_livre/tabela-precos.html',
  '/isaac_treinos_ar_livre/horarios.html',
  '/isaac_treinos_ar_livre/exercicios.html',
  '/isaac_treinos_ar_livre/404.html',
  '/isaac_treinos_ar_livre/manifest.webmanifest',
  '/isaac_treinos_ar_livre/img/logo-black.png',
  '/isaac_treinos_ar_livre/img/logo-white.png',
  '/isaac_treinos_ar_livre/img/logo-favicon.png',
  '/isaac_treinos_ar_livre/assets/css/main.css',
  '/isaac_treinos_ar_livre/assets/css/layout.css',
  '/isaac_treinos_ar_livre/assets/css/components.css',
  '/isaac_treinos_ar_livre/assets/css/mobile-optimizations.css',
  '/isaac_treinos_ar_livre/assets/js/bundle.optimized.js',
  '/isaac_treinos_ar_livre/assets/js/components.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;

  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('/isaac_treinos_ar_livre/')))
    );
    return;
  }

  if (isSameOrigin) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          }
          return networkResponse;
        }).catch(() => cachedResponse);
      })
    );
  }
});

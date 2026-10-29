const CACHE = 'enerelis-shell-v3';
const SHELL = ['./', './index.html', './style.css', './app.js', './catalog.js', './events.js', './art.js', './style.css?v=3', './app.js?v=3', './catalog.js?v=3', './events.js?v=3', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './assets/volume-1.jpg', './assets/volume-2.jpg', './assets/volume-3.jpg', './assets/volume-4.jpg', './assets/volume-5.jpg', './assets/volume-6.jpg', './assets/volume-7.jpg', './assets/mascaras.jpg', './assets/enerelis-exposicao.png', './assets/ambiente.jpg', './assets/personagens.jpg', './assets/cenarios.jpg', './assets/autora.jpg'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL).then(() => self.skipWaiting())));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('enerelis-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put('./index.html', copy)));
      }
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  if (!SHELL.some(path => new URL(path, self.registration.scope).href === url.href)) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy)));
    }
    return response;
  })));
});

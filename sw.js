const CACHE_NAME = 'cache-v2';

self.addEventListener('install', function (event) {
  console.log('ServiceWorker installing...');
  self.skipWaiting();
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
          './',
          './index.html',
          './src/style.css',
          './src/index.js',
          './src/multi-thread.js',
          './src/worker.js',
          './sw/index.html',
          './sw/',
          './single-thead.html',
          './multi-thread.html'
        ]);
      })
    );
  });
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        let responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
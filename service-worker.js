const CACHE_NAME = 'app-cache-v1';

const CACHE_ASSETS = [
  '/Travel/',
  '/Travel/index.html',
  '/Travel/style.css',
  '/Travel/script.js'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            return cache.addAll(CACHE_ASSETS);
        })
    );

    self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );

    return self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', event => {

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );

});


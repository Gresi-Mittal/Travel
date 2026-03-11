const CACHE_NAME = 'app-cache-v1';
const CACHE_ASSETS = [
  '/Travel/',
  '/Travel/index.html',
  '/Travel/style.css',
  '/Travel/script.js'
];
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Deleting Old Cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
return self.clients.claim();
});

// Fetch Event - Serve Cached Files When Offline
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching', event.request.url);

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});



const CACHE_NAME = "fnotes-cache-v1";
const urlsToCache = [
    "/",
    "/client.js",
    "/no-js.css",
    "/style.css",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            return cache.addAll(urlsToCache).catch((error) => {
                console.error("Erro ao adicionar arquivos ao cache:", error);
            });
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
// OLT Manager - Service Worker
// A versão é gerenciada no manifest.json
let CACHE_NAME = "olt-manager-cache"; // fallback genérico
let APP_VERSION = "dev"; // fallback genérico

// Carrega a versão do manifest.json
async function loadVersion() {
  try {
    const manifestResponse = await fetch("./manifest.json");
    const manifest = await manifestResponse.json();
    APP_VERSION = manifest.version || "dev";
    CACHE_NAME = `olt-manager-v${APP_VERSION}`;
    console.log(`[SW] Versão carregada: ${APP_VERSION}`);
  } catch (err) {
    console.warn("[SW] Falha ao carregar versão do manifest, usando fallback:", err);
  }
}

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./Assets/Imagens/favicon-192.png",
  "./Assets/Imagens/favicon-256.png",
  "./Assets/Imagens/favicon-512.png",
  "./Assets/Imagens/screenshot-mobile.png",
  "./Assets/Imagens/screenshot-desktop.png",
  "./olt_commands.js"
];

// Instalação - Cacheia os recursos essenciais
self.addEventListener("install", (event) => {
  event.waitUntil(
    loadVersion().then(() => 
      caches.open(CACHE_NAME).then(async (cache) => {
        console.log("[SW] Iniciando cache de recursos...");
        for (const url of urlsToCache) {
          try {
            await cache.add(new Request(url, { cache: "reload" }));
          } catch (err) {
            console.warn(`[SW] Falha ao cachear: ${url} - O arquivo pode estar faltando.`, err);
          }
        }
      })
    ).then(() => self.skipWaiting())
  );
});

// Ativação - Limpa caches antigos e assume controle imediato
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Evento Fetch - Gerencia cache
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith("http")) return;
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      if (response) return response;

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("index.html", { ignoreSearch: true });
          }
        });
    }),
  );
});

// Mensagens
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

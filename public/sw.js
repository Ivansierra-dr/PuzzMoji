const CACHE_NAME = 'puzzmoji-v1';
const STATIC_CACHE_NAME = 'puzzmoji-static-v1';
const DYNAMIC_CACHE_NAME = 'puzzmoji-dynamic-v1';

// Recursos esenciales para cachear
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/puzzmoji-logo.svg',
  '/manifest.json'
];

// URLs de APIs que necesitamos para funcionar offline
const API_URLS = [
  'https://worldtimeapi.org/api/timezone/Etc/UTC',
  'https://api.timezonedb.com/v2.1/get-time-zone',
  'http://worldclockapi.com/api/json/utc/now'
];

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed:', error);
      })
  );
});

// Activar service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminar caches viejos
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar requests HTTP/HTTPS
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Estrategia para recursos estáticos
  if (STATIC_RESOURCES.some(resource => url.pathname === resource) || 
      url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              // Solo cachear respuestas exitosas
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
        .catch(() => {
          // Si no hay conexión y no está en cache, devolver página offline para HTML
          if (request.headers.get('Accept').includes('text/html')) {
            return caches.match('/index.html');
          }
        })
    );
    return;
  }
  
  // Estrategia para APIs de fecha (importante para el anti-cheat)
  if (API_URLS.some(apiUrl => request.url.startsWith(apiUrl))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cachear respuesta de API por corto tiempo (5 minutos)
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                // Añadir header para expiración
                const headers = new Headers(responseClone.headers);
                headers.append('sw-cache-timestamp', Date.now().toString());
                const modifiedResponse = new Response(responseClone.body, {
                  status: responseClone.status,
                  statusText: responseClone.statusText,
                  headers: headers
                });
                cache.put(request, modifiedResponse);
              });
          }
          return response;
        })
        .catch(() => {
          // Si falla la API, intentar usar cache (pero verificar si no está muy viejo)
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                const timestamp = cachedResponse.headers.get('sw-cache-timestamp');
                const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
                
                // Si el cache es muy viejo, no usarlo para APIs críticas
                if (timestamp && parseInt(timestamp) > fiveMinutesAgo) {
                  return cachedResponse;
                }
              }
              
              // Si no hay cache válido, permitir que falle y use fecha local
              throw new Error('No valid cached date API response');
            });
        })
    );
    return;
  }
  
  // Estrategia network-first para otros requests
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Fallback para páginas HTML
            if (request.headers.get('Accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            
            throw new Error('No cache available');
          });
      })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Notificación de actualización disponible
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    // Verificar si hay una nueva versión
    caches.keys().then((cacheNames) => {
      const hasUpdate = !cacheNames.includes(CACHE_NAME);
      event.ports[0].postMessage({ hasUpdate });
    });
  }
});
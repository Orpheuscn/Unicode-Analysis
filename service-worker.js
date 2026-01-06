const CACHE_NAME = 'unicode-analyzer-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './unicode_data.json',
  './svg_index.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './icon.svg'
];

// 安装事件 - 预缓存核心资源
self.addEventListener('install', (event) => {
  console.log('Service Worker: 正在安装...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: 正在缓存核心资源');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('Service Worker: 正在激活...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 删除旧缓存', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch事件 - 网络优先，失败则使用缓存（适合SVG文件）
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // 对于SVG文件，使用缓存优先策略（因为SVG文件不会变化）
  if (request.url.includes('/char_svgs/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then((response) => {
          // 只缓存成功的响应
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        }).catch(() => {
          // 网络请求失败，返回一个空响应
          return new Response('', { status: 404, statusText: 'Not Found' });
        });
      })
    );
    return;
  }
  
  // 对于其他资源，使用网络优先策略
  event.respondWith(
    fetch(request)
      .then((response) => {
        // 克隆响应并缓存
        const responseToCache = response.clone();
        if (request.method === 'GET' && response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // 网络失败，尝试从缓存获取
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // 如果是HTML页面请求，返回离线页面
          if (request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});


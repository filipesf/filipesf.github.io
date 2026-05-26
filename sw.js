;(() => {
  // Update 'version' if the cache has to be refreshed
  var staticCacheName = 'static'
  var version = 'v2026-05-24::'

  // Store core files in a cache (including a page to display when offline)
  function updateStaticCache() {
    return caches.open(version + staticCacheName).then((cache) => cache.addAll(['/', '/offline/']))
  }

  self.addEventListener('install', (event) => {
    event.waitUntil(updateStaticCache())
  })

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((keys) => {
        // Remove caches whose name is no longer valid
        return Promise.all(
          keys.filter((key) => key.indexOf(version) !== 0).map((key) => caches.delete(key))
        )
      })
    )
  })

  self.addEventListener('fetch', (event) => {
    var request = event.request
    var accept = request.headers.get('Accept') || ''
    // Always fetch non-GET requests from the network
    if (request.method !== 'GET') {
      event.respondWith(fetch(request).catch(() => caches.match('/offline/')))
      return
    }

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (accept.indexOf('text/html') !== -1) {
      // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
      if (request.mode !== 'navigate') {
        request = new Request(request.url, {
          method: 'GET',
          headers: request.headers,
          mode: request.mode,
          credentials: request.credentials,
          redirect: request.redirect
        })
      }
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Stash a copy of this page in the cache
            var copy = response.clone()
            caches.open(version + staticCacheName).then((cache) => {
              cache.put(request, copy)
            })
            return response
          })
          .catch(() =>
            caches.match(request).then((response) => response || caches.match('/offline/'))
          )
      )
      return
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
      caches.match(request).then(
        (response) =>
          response ||
          fetch(request).catch(() => {
            // If the request is for an image, show an offline placeholder
            if (accept.indexOf('image') !== -1) {
              return new Response(
                '<svg width="400" height="300" role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>',
                {
                  headers: {
                    'Content-Type': 'image/svg+xml'
                  }
                }
              )
            }
          })
      )
    )
  })
})()

let cacheData = "apurvApp";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/bundle.js',
        '/static/css/main.chunk.css',
        '/index.html',
        '/'
      ])
    })
  )
})
this.addEventListener("fetch", (event) => {

  console.warn("url",event.request.url)

  if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
    event.waitUntil(
      this.registration.showNotification("apurv", {
        body: "hello apurv",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0M2JB-jKxv0MS2IH8Gc3i9EsisYsv7ue7Q&usqp=CAU"
      })
    )
  }
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        // let requestUrl = event.request.clone();
        // fetch(requestUrl);
      })
    )
  }
}) 
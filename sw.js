importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: '2026-03'
});

registerRoute(
  '/',
  new NetworkFirst()
);

registerRoute(
  /page[0-99]/,
  new NetworkFirst()
)

registerRoute(
  new RegExp('/\\d{4}/\\d{2}/\\d{2}/.+'),
  new StaleWhileRevalidate()
)

workbox.precaching.precacheAndRoute([
  { url: '/product/masker-bordir-tasikmalaya-motif-kucing/', revision: '2021-03-20' },
  { url: '/product/masker-bordir-tasik-tulip/', revision: '2021-02-26' },
  { url: '/product/masker-bordir-tasik-rosse/', revision: '2021-02-25' },
  { url: '/product/masker-bordir-tasik-smaya/', revision: '2021-02-11' },
  { url: '/product/masker-3d-bodir-3lapis-tasikmalaya/', revision: '2021-02-10' },
  { url: '/product/masker-bordir-tasik-bunga-setaman/', revision: '2021-02-07' },
  { url: '/product/masker-bordir-tasikmalaya-mawar/', revision: '2021-02-04' },
  { url: '/product/masker-bordir-tasik-ilalang/', revision: '2021-02-02' },
  { url: '/product/masker-bordir-tasik-dahlia/', revision: '2021-02-01' },
  { url: '/product/mukena-garcella-rayon-premium/', revision: '2020-05-22' },
  { url: '/', revision: '202603210411' },
  { url: '/product', revision: '202603210411' },
  { url: '/assets/css/style.css', revision: '202603210411' },
  { url: '/assets/css/webshop.css', revision: '202603210411' }
])

registerRoute(
  ({request}) => request.destination === 'image' ,
  new CacheFirst({
    plugins: [
      new CacheableResponse({statuses: [0, 200]})
    ],
  })
);

registerRoute(
  /\/(images|icon|css)/,
  new CacheFirst()
);

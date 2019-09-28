const summary = require("./assets/contents/posts/summary.json");

export default {
  css: ["normalize.css/normalize.css", "assets/global.css"],
  env: {
    baseUrl: process.env.NUXT_BASE_URL || "http://localhost:3000"
  },
  head: {
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      { name: "theme-color", content: "white" },
      {
        hid: "og:image",
        property: "og:image",
        content: `${process.env.NUXT_BASE_URL}/icons/256x256.png`
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@naoty_k" },
      {
        hid: "twitter:image",
        property: "twitter:image",
        content: `${process.env.NUXT_BASE_URL}/icons/256x256.png`
      }
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/icons/favicon.png" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" }
    ]
  },
  generate: {
    routes: Object.keys(summary).map(id => `/posts/${id}.html`)
  }
};

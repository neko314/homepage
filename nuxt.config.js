const summary = require("./assets/contents/posts/summary.json");
const feed = require("./configs/feed");
const head = require("./configs/head");
const hooks = require("./configs/hooks");

export default {
  css: ["normalize.css/normalize.css", "assets/global.css"],
  env: {
    baseUrl: process.env.NUXT_BASE_URL || "http://localhost:3000"
  },
  feed,
  head,
  hooks,
  generate: {
    routes: Object.keys(summary).map(id => `/posts/${id}`)
  },
  modules: ["@nuxtjs/feed", "@nuxtjs/router"]
};

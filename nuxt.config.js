const feed = require("./configs/feed");
const generate = require("./configs/generate");
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
  generate,
  modules: ["@nuxtjs/feed", "@nuxtjs/router"]
};

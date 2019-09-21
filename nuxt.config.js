export default {
  css: ["normalize.css/normalize.css", "assets/global.css"],
  env: {
    baseUrl: process.env.NUXT_BASE_URL || "http://localhost:3000"
  },
  head: {
    title: "",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      { hid: "description", name: "description", content: "" },
      { hid: "theme-color", name: "theme-color", content: "white" },
      { hid: "og:type", property: "og:type", content: "profile" },
      { hid: "og:title", property: "og:title", content: "" },
      { hid: "og:description", property: "og:description", content: "" },
      { hid: "og:url", property: "og:url", content: "" },
      { hid: "og:image", property: "og:image", content: "" },
      { hid: "twitter:card", property: "twitter:card", content: "summary" },
      { hid: "twitter:site", property: "twitter:site", content: "@naoty_k" },
      { hid: "twitter:title", property: "twitter:title", content: "" },
      {
        hid: "twitter:description",
        property: "twitter:description",
        content: ""
      }
    ],
    link: [
      {
        hid: "icon",
        rel: "icon",
        type: "image/png",
        href: "/icons/favicon.png"
      },
      {
        hid: "apple-touch-icon",
        rel: "apple-touch-icon",
        href: "/icons/apple-touch-icon.png"
      },
      { hid: "canonical", rel: "canonical", href: "" },
      { hid: "manifest", rel: "manifest", href: "/manifest.json" }
    ]
  }
};

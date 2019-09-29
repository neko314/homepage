const dayjs = require("dayjs");
const summary = require("./assets/contents/posts/summary.json");

export default {
  css: ["normalize.css/normalize.css", "assets/global.css"],
  env: {
    baseUrl: process.env.NUXT_BASE_URL || "http://localhost:3000"
  },
  feed: [
    {
      path: "/posts/feed.atom",
      async create(feed) {
        feed.options = {
          title: "Naoto Kaneko's posts",
          link: `${process.env.NUXT_BASE_URL}/posts/`
        };

        const posts = Object.values(summary);
        for (let post of posts) {
          const item = {
            title: post.frontMatter.title,
            id: `${process.env.NUXT_BASE_URL}/posts/${post.id}.html`,
            link: `${process.env.NUXT_BASE_URL}/posts/${post.id}.html`,
            content: require(`./assets/contents/posts/${post.id}.json`).html,
            date: dayjs(post.frontMatter.time, "YYYY-MM-DD:HH:mm:ssZZ")
          };

          if (post.frontMatter.description !== undefined) {
            item.description = post.frontMatter.description;
          }

          feed.addItem(item);
        }

        feed.addContributor({
          name: "Naoto Kaneko",
          email: "naoty.k@gmail.com",
          link: process.env.NUXT_BASE_URL
        });
      },
      cacheTime: 0,
      type: "atom1",
      data: []
    }
  ],
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
  hooks: {
    generate: {
      page(generator) {
        generator.path = generator.path.replace(
          /\/posts\/(?<id>\d+)\/index\.html/,
          "/posts/$<id>.html"
        );
        return generator;
      }
    }
  },
  generate: {
    routes: Object.keys(summary).map(id => `/posts/${id}`)
  },
  modules: ["@nuxtjs/feed"]
};

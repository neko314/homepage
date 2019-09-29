const dayjs = require("dayjs");
const summary = require("../assets/contents/posts/summary.json");

module.exports = [
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
          content: require(`../assets/contents/posts/${post.id}.json`).html,
          date: dayjs(post.frontMatter.time, "YYYY-MM-DD:HH:mm:ssZZ"),
          author: [
            {
              name: "Naoto Kaneko",
              email: "naoty.k@gmail.com",
              link: process.env.NUXT_BASE_URL
            }
          ]
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
];

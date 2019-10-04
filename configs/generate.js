const summary = require("../assets/contents/posts/summary.json");
const postPaths = Object.keys(summary).map(id => `/posts/${id}.html`);
const tagPaths = Object.values(summary)
  .flatMap(({ frontMatter: { tags } }) => tags)
  .filter(tag => tag !== undefined)
  .filter((tag, index, self) => self.indexOf(tag) === index)
  .map(tag => `/posts/${tag}/`);

module.exports = {
  routes: ["/", "/posts/", ...postPaths, ...tagPaths]
};

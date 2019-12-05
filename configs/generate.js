const summary = require("../assets/contents/posts/summary.json");
const postPaths = Object.keys(summary).map(id => `/posts/${id}`);
const tagPaths = Object.values(summary)
  .flatMap(({ frontMatter: { tags } }) => tags)
  .filter(tag => tag !== undefined)
  .filter((tag, index, self) => self.indexOf(tag) === index)
  .map(tag => `/posts/${tag}/index`);

module.exports = {
  routes: ["/index", "/posts/index", ...postPaths, ...tagPaths],
  subFolders: false
};

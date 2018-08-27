const path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fileAbsolutePath
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const basename = path.basename(node.fileAbsolutePath, ".md");
        createPage({
          path: `/posts/${basename}.html`,
          component: path.resolve("./src/templates/post.jsx")
        });
      });
      resolve();
    })
  });
};

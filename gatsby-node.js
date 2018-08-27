const path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              id
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
          component: path.resolve("./src/templates/post.jsx"),
          context: {
            id: node.id
          }
        });
      });
      resolve();
    })
  });
};

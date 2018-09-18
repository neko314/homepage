const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
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
  `);

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

  return Promise.resolve();
};

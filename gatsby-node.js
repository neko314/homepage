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
            frontmatter {
              tags
            }
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

  const tags = [];
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.tags === null) {
      return;
    }

    node.frontmatter.tags.forEach(tag => {
      if (tags.includes(tag)) {
        return;
      }

      tags.push(tag);
      createPage({
        path: `/posts/${tag}/`,
        component: path.resolve("./src/templates/tag/index.jsx"),
        context: {
          tag
        }
      });
    });
  });

  return Promise.resolve();
};

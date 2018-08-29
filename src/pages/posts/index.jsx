import React from "react";
import path from "path";
import Link from "gatsby-link";
import Container from "../../components/container";
import List from "../../components/list";
import Navigation from "../../components/navigation";
import PageTitle from "../../components/pageTitle";

const links = [
  { title: "トップ", path: "/" }
];

export default ({ data }) => (
  <Container>
    <PageTitle>ブログ</PageTitle>
    <List>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <li key={index}>
          <Link to={`/posts/${path.basename(node.fileAbsolutePath, ".md")}.html`}>
            {node.frontmatter.title}
          </Link>
        </li>
      ))}
    </List>
    <Navigation links={links} />
  </Container>
);

export const query = graphql`
  query PostsQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___time], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
          }
          fileAbsolutePath
        }
      }
    }
  }
`;

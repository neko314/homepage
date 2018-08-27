import React from "react";
import Link from "gatsby-link";
import Container from "../../components/container";
import List from "../../components/list";
import Navigation from "../../components/navigation";
import PageTitle from "../../components/pageTitle";

export default ({ data }) => (
  <Container>
    <PageTitle>ブログ</PageTitle>
    <List>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <li key={index}>{node.frontmatter.title}</li>
      ))}
    </List>
    <Navigation>
      <Link to="/">トップ</Link>
    </Navigation>
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
        }
      }
    }
  }
`;

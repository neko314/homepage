import React from "react";
import Link from "gatsby-link";
import styled from "react-emotion";
import Container from "../../components/container";
import List from "../../components/list";
import PageTitle from "../../components/pageTitle";

const Navigation = styled.p`
  text-align: center;
`;

export default ({ data }) => (
  <Container>
    <PageTitle>ブログ</PageTitle>
    <List>
      {data.allFile.edges.map(({ node }, index) => (
        <li key={index}>{node.base}</li>
      ))}
    </List>
    <Navigation>
      <Link to="/">トップ</Link>
    </Navigation>
  </Container>
);

export const query = graphql`
  query PostsQuery {
    allFile {
      edges {
        node {
          base
          name
        }
      }
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";
import Container from "../../components/Container";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import Navigation from "../../components/Navigation";
import PageTitle from "../../components/PageTitle";
import path from "path";
import styled from "@emotion/styled";

const links = [
  { title: "Top", path: "/" },
  { title: "Posts", path: "/posts/" }
];

const Tag = styled.span`
  font-family: Source Code Pro, monospace;
`;

export default ({ data, location }) => {
  const tag = path.basename(location.pathname);
  return (
    <Container>
      <PageTitle><Tag>#{tag}</Tag></PageTitle>
      <List>
        {data.allMarkdownRemark.edges.map(({ node }, index) => (
          <ListItem
            key={index}
            title={node.frontmatter.title}
            href={`/posts/${path.basename(node.fileAbsolutePath, ".md")}.html`}
            tags={node.frontmatter.tags || []} />
        ))}
      </List>
      <Navigation links={links} />
    </Container>
  );
}

export const query = graphql`
  query TaggedPostsQuery($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $tag } } },
      sort: { fields: [frontmatter___time], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags
          }
          fileAbsolutePath
        }
      }
    }
    sitePage {
      path
    }
  }
`;

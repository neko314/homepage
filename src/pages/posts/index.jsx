import React from "react";
import path from "path";
import { graphql } from "gatsby";
import Container from "../../components/Container";
import Head from "../../components/Head";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import Navigation from "../../components/Navigation";
import PageTitle from "../../components/PageTitle";

const links = [
  { title: "Top", path: "/" }
];

export default ({ data }) => (
  <Container>
    <Head
      title="Naoto Kaneko's posts"
      description="Naoto Kaneko's posts"
      url={`${data.site.siteMetadata.rootURL}/posts/`}
      imageURL={`${data.site.siteMetadata.rootURL}/icons/256x256.png`}
    />

    <PageTitle>Posts</PageTitle>
    <List>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <ListItem
          key={index}
          title={node.frontmatter.title}
          href={`/posts/${path.basename(node.fileAbsolutePath, ".md")}.html`} />
      ))}
    </List>
    <Navigation links={links} />
  </Container>
);

export const query = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        rootURL
      }
    }
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

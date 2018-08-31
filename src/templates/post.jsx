import React from "react";
import Container from "../components/Container";
import Navigation from "../components/Navigation";
import PageTitle from "../components/PageTitle";
import PostContent from "../components/PostContent";
import PostMetadata from "../components/PostMetadata";

const links = [
  { title: "トップ", path: "/" },
  { title: "ブログ", path: "/posts/" }
];

export default ({ data }) => (
  <Container>
    <PageTitle>{data.markdownRemark.frontmatter.title}</PageTitle>
    <PostMetadata time={data.markdownRemark.frontmatter.time} />
    <PostContent html={data.markdownRemark.html} />
    <Navigation links={links} />
  </Container>
);

export const query = graphql`
  query PostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        time
      }
      html
    }
  }
`;

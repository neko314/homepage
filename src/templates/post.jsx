import React from "react";
import Container from "../components/container";
import Navigation from "../components/navigation";
import PageTitle from "../components/pageTitle";
import PostContent from "../components/postContent";
import PostMetadata from "../components/postMetadata";

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

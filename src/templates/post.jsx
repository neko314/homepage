import React from "react";
import Link from "gatsby-link";
import Container from "../components/container";
import Navigation from "../components/navigation";
import PageTitle from "../components/pageTitle";
import PostContent from "../components/postContent";

export default ({ data }) => (
  <Container>
    <PageTitle>{data.markdownRemark.frontmatter.title}</PageTitle>
    <PostContent html={data.markdownRemark.html} />
    <Navigation>
      <Link to="/">トップ</Link>
      <span> | </span>
      <Link to="/posts/">ブログ</Link>
    </Navigation>
  </Container>
);

export const query = graphql`
  query PostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;

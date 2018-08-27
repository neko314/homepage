import React from "react";
import Container from "../components/container";
import PageTitle from "../components/pageTitle";

export default ({ data }) => (
  <Container>
    <PageTitle>{data.markdownRemark.frontmatter.title}</PageTitle>
    <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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

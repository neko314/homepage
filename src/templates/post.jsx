import React from "react";
import path from "path";
import Container from "../components/Container";
import Head from "../components/Head";
import Navigation from "../components/Navigation";
import PageTitle from "../components/PageTitle";
import PostContent from "../components/PostContent";
import PostMetadata from "../components/PostMetadata";

const links = [
  { title: "Top", path: "/" },
  { title: "Posts", path: "/posts/" }
];

export default ({ data }) => {
  const postID = path.basename(data.markdownRemark.fileAbsolutePath, ".md");

  return (
    <Container>
      <Head
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description || data.markdownRemark.frontmatter.title}
        url={`${data.site.siteMetadata.rootURL}/posts/${postID}.html`}
        imageURL={`${data.site.siteMetadata.rootURL}/icons/256x256.png`}
      />

      <PageTitle>{data.markdownRemark.frontmatter.title}</PageTitle>
      <PostMetadata time={data.markdownRemark.frontmatter.time} />
      <PostContent html={data.markdownRemark.html} />
      <Navigation links={links} />
    </Container>
  )
};

export const query = graphql`
  query PostQuery($id: String!) {
    site {
      siteMetadata {
        rootURL
      }
    }
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        time
        description
      }
      html
      fileAbsolutePath
    }
  }
`;

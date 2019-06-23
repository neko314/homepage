import React from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import Container from "../components/Container";
import Head from "../components/Head";
import List from "../components/List";
import PageTitle from "../components/PageTitle";

export default ({ data }) => (
  <Container>
    <Head
      title="Naoto Kaneko"
      description="Naoto Kaneko's homepage"
      url={data.site.siteMetadata.rootURL}
      imageURL={`${data.site.siteMetadata.rootURL}/icons/256x256.png`}
    />

    <PageTitle>Naoto Kaneko</PageTitle>
    <List>
      <li><Link to="/posts/">Posts</Link></li>
      <li><a href="https://github.com/naoty">GitHub</a></li>
      <li><a href="https://twitter.com/naoty_k">Twitter</a></li>
      <li><a href="https://atcoder.jp/users/naoty">AtCoder</a></li>
    </List>
  </Container>
);

export const query = graphql`
  query TopQuery {
    site {
      siteMetadata {
        rootURL
      }
    }
  }
`;

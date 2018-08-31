import React from "react";
import Link from "gatsby-link";
import Container from "../components/Container";
import List from "../components/List";
import PageTitle from "../components/PageTitle";

export default () => (
  <Container>
    <PageTitle>Naoto Kaneko</PageTitle>
    <List>
      <li><Link to="/posts/">ブログ</Link></li>
      <li><a href="https://github.com/naoty">GitHub</a></li>
      <li><a href="https://twitter.com/naoty_k">Twitter</a></li>
    </List>
  </Container>
);

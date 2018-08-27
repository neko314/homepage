import React from "react";
import Link from "gatsby-link";
import Container from "../components/container";
import List from "../components/list";
import PageTitle from "../components/pageTitle";

export default () => (
  <Container>
    <PageTitle>金子 直人</PageTitle>
    <List>
      <li><Link to="/posts/">ブログ</Link></li>
      <li><a href="https://github.com/naoty">GitHub</a></li>
      <li><a href="https://twitter.com/naoty_k">Twitter</a></li>
    </List>
  </Container>
);

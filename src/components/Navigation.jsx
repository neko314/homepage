import React from "react";
import Link from "gatsby-link";
import styled from "@emotion/styled";

const Container = styled.ul`
  margin-left: 0;
  list-style: none;
  text-align: center;

  li {
    display: inline;

    &:not(:last-child) {
      margin-right: 0.5rem;
      padding-right: 0.5rem;
      border-right: 1px solid #333;
    }
  }
`;

export default ({ links }) => (
  <Container>
    {links.map((link, index) => (
      <li key={index}><Link to={link.path}>{link.title}</Link></li>
    ))}
  </Container>
);

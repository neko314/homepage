import React from "react";
import Link from "gatsby-link";
import styled from "react-emotion";

const Container = styled.ul`
  list-style: none;
  text-align: center;

  li {
    display: inline;
  }

  span {
    margin: 0 0.5rem;
  }
`;

export default ({ links }) => {
  const lists = [];
  links.forEach((link, index) => {
    lists.push(
      <li key={index}>
        <Link to={link.path}>{link.title}</Link>
      </li>
    );
    if (index < links.length - 1) {
      lists.push(<span key={`${index}-${index + 1}`}>|</span>);
    }
  });

  return <Container>{lists}</Container>;
}

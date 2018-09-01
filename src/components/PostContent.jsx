import React from "react";
import styled from "react-emotion";
import { rhythm } from "../utils/typography";

const Container = styled.section`
  margin-bottom: ${rhythm(1)};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${rhythm(1/2)};
  }

  p,
  ol,
  ul,
  pre,
  table {
    margin-bottom: ${rhythm(1)};
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  a {
    color: #000;
  }

  img {
    display: block;
    width: 80%;
    margin: 0 auto;
    box-shadow: 3px 0 3px rgba(0, 0, 0, 0.3), -3px 0 3px rgba(0, 0, 0, 0.3), 0 3px 3px rgba(0, 0, 0, 0.3);
  }

  pre {
    padding: ${rhythm(1/2)};
    background-color: #333;
    color: #fff;
    overflow-x: auto;
  }

  table {
    border: 1px solid #333;
  }

  th,
  td {
    padding: 0.25rem;
    border: 1px solid #333;
  }

  th {
    text-align: center;
  }

  @media (min-width: 35rem) {
    pre,
    pre > code {
      font-size: 0.8rem;
      line-height: 1.8;
    }
  }
`;

export default ({ html }) => (
  <Container dangerouslySetInnerHTML={{ __html: html }} />
);

import React from "react";
import styled from "react-emotion";
import typography from "../utils/typography";

const Container = styled.section`
  margin-bottom: ${typography.rhythm(1)};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${typography.rhythm(1/2)};
  }

  p,
  ol,
  ul,
  pre,
  table {
    margin-bottom: ${typography.rhythm(1)};
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

  code {
    margin: 0 0.25rem;
    font-size: 1rem;
  }

  img {
    display: block;
    width: 80%;
    margin: 0 auto;
    box-shadow: 3px 0 3px rgba(0, 0, 0, 0.3), -3px 0 3px rgba(0, 0, 0, 0.3), 0 3px 3px rgba(0, 0, 0, 0.3);
  }

  pre {
    padding: ${typography.rhythm(1/2)};
    background-color: #333;
    color: #fff;
    line-height: 1.8;
    overflow-x: auto;
  }

  pre > code {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.5;
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
`;

export default ({ html }) => (
  <Container dangerouslySetInnerHTML={{ __html: html }} />
);
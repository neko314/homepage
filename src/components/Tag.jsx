import React from "react";
import Link from "gatsby-link";
import styled from "@emotion/styled";

const Container = styled.span`
  display: inline;
  margin-left: 0.5rem;
`;

const style = {
  color: "rgba(0, 0, 0, 0.54)",
  fontFamily: "Source Code Pro, monospace",
  fontSize: "0.8rem",
  textDecoration: "none"
};

export default ({ key, name }) => {
  return (
    <Container key={key}>
      <Link to={`/posts/${name}/`} style={style}>
        #{name}
      </Link >
    </Container>
  );
}

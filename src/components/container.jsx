import React from "react";
import styled from "react-emotion";
import { rhythm } from "../utils/typography";

const Container = styled.main`
  padding: ${rhythm(1/2)};
  background-color: #fff;

  @media (min-width: 35rem) {
    width: 35rem;
    margin: ${rhythm(1)} auto;
    padding: ${rhythm(1)};
    box-shadow: 0 5px 5px rgba(0,0,0,.1), 3px 0 5px rgba(0,0,0,.1), -3px 0 5px rgba(0,0,0,.1);
  }

  & *:last-child {
    margin-bottom: 0;
  }
`;

export default ({ children }) => (
  <Container>
    {children}
  </Container>
);

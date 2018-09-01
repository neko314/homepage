import React from "react";
import styled from "react-emotion";
import { rhythm } from "../utils/typography";

const List = styled.ul`
  margin-left: 2rem;

  & > li {
    margin-bottom: ${rhythm(1/4)};
  }
`;

export default ({ children }) => (
  <List>
    {children}
  </List>
)

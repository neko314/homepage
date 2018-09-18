import React from "react";
import styled from "react-emotion";
import typography from "../utils/typography";

const List = styled.ul`
  margin-left: 2rem;

  & > li {
    margin-bottom: ${typography.rhythm(1/4)};
  }
`;

export default ({ children }) => (
  <List>
    {children}
  </List>
)

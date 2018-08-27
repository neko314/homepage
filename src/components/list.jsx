import React from "react";
import styled from "react-emotion";

const List = styled.ul`
  margin-left: 2rem;
`;

export default ({ children }) => (
  <List>
    {children}
  </List>
)

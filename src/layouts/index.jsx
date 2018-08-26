import React from "react";
import Container from "../components/container";

export default ({ children }) => (
  <Container>
    {children()}
  </Container>
)

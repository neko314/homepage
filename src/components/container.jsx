import React from "react";
import { css } from "emotion";
import { rhythm } from "../utils/typography";

const container = css`
  width: 35rem;
  margin: ${rhythm(2)} auto 0;
  padding: ${rhythm(2)};
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(0,0,0,.1), 3px 0 5px rgba(0,0,0,.1), -3px 0 5px rgba(0,0,0,.1);
`;

export default ({ children }) => (
  <main className={container}>
    {children}
  </main>
);

import React from "react";
import Link from "gatsby-link";
import styled from "@emotion/styled";

const Tag = styled.span`
  margin-left: 0.5rem;
  color: rgba(0, 0, 0, 0.54);
  font-family: Source Code Pro, monospace;
  font-size: 0.8rem;
`;

export default ({ key, title, href, tags }) => (
  <li key={key}>
    <Link to={href}>
      {title}
    </Link>

    {tags.map((tag, index) => <Tag key={index}>#{tag}</Tag>)}
  </li>
);

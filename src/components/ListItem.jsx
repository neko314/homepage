import React from "react";
import Link from "gatsby-link";

export default ({ key, title, href }) => (
  <li key={key}>
    <Link to={href}>
      {title}
    </Link>
  </li>
);

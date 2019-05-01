import React from "react";
import Link from "gatsby-link";
import Tag from "../components/Tag";

export default ({ key, title, href, tags }) => (
  <li key={key}>
    <Link to={href}>
      {title}
    </Link>

    {tags.map((tag, index) => <Tag key={index} name={tag} />)}
  </li>
);

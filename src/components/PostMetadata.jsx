import React from "react";
import { DateTime } from "luxon";
import styled from "@emotion/styled";

const Container = styled.p`
  color: rgba(0, 0, 0, 0.54);
  font-family: Source Code Pro, monospace;
  font-size: 0.8rem;
`;

const Tag = styled.span`
  margin-left: 0.5rem;
`;

export default ({ time, tags }) => {
  const datetime = DateTime.fromISO(time);
  return (
    <Container>
      <time dateTime={datetime.toISO()}>{datetime.toFormat("yyyy-MM-dd HH:mm:ss")}</time>
      {tags.map((tag, index) => <Tag key={index}>#{tag}</Tag>)}
    </Container>
  )
};

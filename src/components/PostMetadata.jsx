import React from "react";
import { DateTime } from "luxon";
import styled from "@emotion/styled";

const Container = styled.p`
  color: rgba(0, 0, 0, 0.54);
  font-family: SFMono-Regular, Consolas, Monaco, Courier, monospace;
  font-size: 0.8rem;
`;

export default ({ time }) => {
  const datetime = DateTime.fromISO(time);
  return (
    <Container>
      <time dateTime={datetime.toISO()}>{datetime.toFormat("yyyy-MM-dd HH:mm:ss")}</time>
    </Container>
  )
};

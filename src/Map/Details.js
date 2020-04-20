import React from "react";
import styled from "styled-components";

export default function Details({ item, color, ...rest }) {
  if (!item) return null;
  return (
    <Content {...rest} style={{ color: color }}>
      <Title>{item.country}</Title>
      {item.status}
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  font-family: "league-gothic-1", sans-serif;
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
`;

const Title = styled.div`
  font-size: 24px;
`;

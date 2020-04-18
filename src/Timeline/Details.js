import React from "react";
import styled from "styled-components";

export default function Details({ item, ...rest }) {
  return (
    <Content {...rest}>
      <div>{item.Date}</div>
      <Title>{item.Event}</Title>
      <div>{item.Name}</div>
      <div>{item.Details}</div>
      <div> {item.Location}</div>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-family: "league-gothic-1", sans-serif;
  font-size: 22px;
  text-transform: uppercase;
`;

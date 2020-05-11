import React from "react";
import styled from "styled-components";

export default function Details({ item, ...rest }) {
  if (!item) return null;
  return (
    <Content {...rest}>
      <Date>{item.date}</Date>
      <Title>{item.event}</Title>
      <Name>{item.name}</Name>
      <Info>{item.details}</Info>
      <Location>
        <Icon />
        &nbsp;{item.location}
      </Location>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  max-width: 300px;
  color: white;
`;

const Title = styled.div`
  font-family: "league-gothic-1", sans-serif;
  font-size: 22px;
  text-transform: uppercase;
`;

const Date = styled(Title)`
  font-size: 30px;
  margin-bottom: 8px;
`;

const Name = styled.div`
  border-top: 1px solid white;
  margin-top: 8px;
  padding-top: 8px;
  text-transform: none;
`;

const Info = styled.div`
  padding-top: 8px;
`;

const Location = styled.div`
  padding-top: 8px;
  display: flex;
`;

const Icon = () => (
  <svg
    width={13}
    height={20}
    viewBox="0 0 13 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.476 0A6.484 6.484 0 000 6.475a6.5 6.5 0 00.778 3.078l5.344 9.664a.404.404 0 00.708 0l5.345-9.668c.508-.94.776-2.002.776-3.074A6.483 6.483 0 006.476 0m0 9.713a3.242 3.242 0 01-3.238-3.238 3.24 3.24 0 013.238-3.237 3.24 3.24 0 013.237 3.237 3.241 3.241 0 01-3.237 3.238"
      fill="#fff"
    />
  </svg>
);

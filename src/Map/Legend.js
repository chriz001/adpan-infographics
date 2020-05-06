import React from "react";
import styled from "styled-components";

const Legend = ({ title, items, note, getColor }) => {
  return (
    <LegendContainer>
      <LegendTitle>{title}</LegendTitle>
      {items.map((item) => (
        <LegendItem key={item} color={getColor(item)}>
          {item}
        </LegendItem>
      ))}
      <LegendNote>{note}</LegendNote>
    </LegendContainer>
  );
};

const LegendContainer = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    max-width: 300px;
  }
`;

const LegendTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #d8121b;
  margin-bottom: 20px;
`;

const LegendItem = styled.div`
  font-family: "league-gothic-1", sans-serif;
  margin-bottom: 8px;
  font-size: 20px;
  white-space: nowrap;

  &::before {
    display: inline-block;
    content: "";
    width: 20px;
    height: 20px;
    background-color: ${(p) => p.color};
    border-radius: 10px;
    margin-right: 8px;
    margin-bottom: -2px;
  }
`;

const LegendNote = styled.div`
  margin-top: 40px;
  font-size: 14px;
  color: #b2b2b2;
  p {
    font-size: 14px;
    line-height: 1.2;
  }
  a {
    color: #b2b2b2;
  }
`;

export default Legend;

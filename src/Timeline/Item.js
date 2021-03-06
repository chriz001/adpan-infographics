import React from "react";
import styled from "styled-components";

export default function TimelineItem({
  width,
  item,
  prevYear,
  dotReference,
  setActive,
  ...rest
}) {
  return (
    <Item w={width} {...rest}>
      <Title>{item.event}</Title>
      <Separator />
      <Line>
        <Dot
          ref={dotReference}
          onMouseEnter={setActive(item)}
          onMouseLeave={setActive(null)}
        />
      </Line>
      <Date>
        <Month>{item.month}</Month>
        {prevYear !== item.year && <Year>{item.year}</Year>}
      </Date>
    </Item>
  );
}

const Item = styled.div`
  flex: 0 0 ${({ w }) => w}px;
  width: ${({ w }) => w}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: normal;
  align-items: center;
  color: #b2b2b2;
`;

const Title = styled.div`
  text-align: center;
  padding: 10px;
  font-family: "league-gothic-1", sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  width: 100%;
`;

const Separator = styled.div`
  width: 1px;
  height: 100px;
  background: #b2b2b2;
  left: 50%;
`;

const Line = styled.div`
  width: 100%;
  background-color: #b2b2b2;
  margin: 30px 0;
  position: relative;
  height: 4px;
`;

const Dot = styled.div`
  display: block;
  position: absolute;
  width: 28px;
  height: 28px;
  background-color: #b2b2b2;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 28px;
  box-shadow: 0 0 0 1px white;
  transition: all 160ms ease-in-out;

  &:hover {
    background-color: #da0b0b;
    cursor: pointer;
    box-shadow: 0 0 0 3px white, 0 0 0 4px #da0b0b;
  }
`;

const Date = styled.div`
  height: 80px;
  text-align: center;
  text-transform: uppercase;
`;

const Month = styled.div`
  font-size: 12px;
  height: 15px;
`;

const Year = styled.div`
  font-family: "league-gothic-1", sans-serif;
  font-size: 40px;
`;

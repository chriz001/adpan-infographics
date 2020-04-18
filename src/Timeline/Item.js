import React, { useState, useRef } from "react";
import styled from "styled-components";

import useOnClickOutside from "../util/useOnClickOutside";
import Tooltip from "./Tooltip";
import Details from "./Details";

export default function TimelineItem({ width, item, prevYear, ...rest }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const activeClass = visible ? "active" : "";
  useOnClickOutside(ref, () => setVisible(false), visible);
  return (
    <Item w={width} {...rest}>
      <Title>{item.Event}</Title>
      <Separator />
      <Line>
        <div
          ref={ref}
          //onMouseEnter={() => setVisible(true)}
          //onMouseLeave={() => setVisible(false)}
          onClick={() => setVisible(true)}
        >
          <Tooltip content={<Details item={item} />} visible={visible}>
            <Dot className={activeClass} />
          </Tooltip>
        </div>
      </Line>
      <Date>
        <Month>{item.Month}</Month>
        {prevYear !== item.Year && <Year>{item.Year}</Year>}
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

  &:hover,
  &.active {
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

import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring/web.cjs";
import { useGesture } from "react-use-gesture";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";

import Popover from "../Popover";
import Item from "./Item";
import Details from "./Details";

export default function Timeline({ items, itemWidth = 160 }) {
  const popoverRef = useRef();
  const [scrollSize, setScrollSize] = useState(0);
  const [{ x }, springSet] = useSpring(() => ({
    x: 0,
    onFrame: () => popoverRef.current.updatePopover(),
  }));
  const [{ scroll }, scrollSet] = useSpring(() => ({ scroll: 0 }));
  const { ref: parent, width: parentWidth = 425 } = useResizeObserver();
  const trackWidth = itemWidth * items.length;

  const [referenceElement, setReferenceElement] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [delayHandler, setDelayHandler] = useState(null);

  const handleChange = (value) => {
    const dragBoundary = parentWidth - trackWidth;
    springSet({ x: value });
    scrollSet({ scroll: (value * 100) / dragBoundary });
  };

  const setActive = (value) => () => {
    clearTimeout(delayHandler);
    if (value === true) return;
    if (value) {
      setActiveEvent(value);
    } else {
      setDelayHandler(
        setTimeout(() => {
          setActiveEvent(null);
        }, 200)
      );
    }
  };

  const bind = useGesture(
    {
      onDrag: (props) => {
        handleChange(props.offset[0]);
      },
    },
    {
      drag: {
        rubberband: true,
        bounds: {
          enabled: true,
          right: parent && trackWidth - parentWidth,
          left: 0,
        },
      },
    }
  );

  useEffect(() => {
    const distance = trackWidth - parentWidth;
    const value = x.value < distance ? x.value : distance;
    handleChange(value);
    setScrollSize((parentWidth * 100) / trackWidth);
  }, [parentWidth]);

  return (
    <Wrapper ref={parent}>
      <Track
        {...bind()}
        style={{ transform: x.interpolate((x) => `translateX(${x}px)`) }}
      >
        {items.map((item, i) => {
          const ref = activeEvent === item ? setReferenceElement : null;
          return (
            <Item
              key={i}
              width={itemWidth}
              item={item}
              prevYear={items[i - 1]?.Year}
              dotReference={ref}
              setActive={setActive}
            />
          );
        })}
      </Track>
      <Progress>
        <Bar
          style={{
            width: `${scrollSize}%`,
            right: scroll.interpolate(
              (x) => `${-((100 - scrollSize) * x) / 100}%`
            ),
          }}
        />
      </Progress>
      <Swipe>{"< swipe >"}</Swipe>
      <Popover
        ref={popoverRef}
        referenceElement={referenceElement}
        color="#d8121b"
        placement="top"
        modifiers={[{ name: "offset", options: { offset: [-4, 32] } }]}
        setActive={setActive}
      >
        <Details item={activeEvent} />
      </Popover>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  user-select: none;
`;

const Track = animated(styled.div`
  display: flex;
  white-space: nowrap;
  position: relative;
  height: 400px;
  flex-direction: row-reverse;
  cursor: grab;
  padding-bottom: 20px;
`);

const Progress = styled.div`
  width: 100%;
  position: relative;
  height: 1px;
  background-color: #da0b0b;
  margin: 0 auto;
`;

const Bar = animated(styled.div`
  position: absolute;
  right: 0;
  top: -2px;
  bottom: -2px;
  display: block;
  width: 100px;
  background-color: #da0b0b;
`);

const Swipe = styled.div`
  text-transform: uppercase;
  text-align: center;
  font-size: 10px;
  margin-top: 10px;
  color: #b2b2b2;
`;

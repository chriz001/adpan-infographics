import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";

import Item from "./Item";

export default function Timeline({ items, width = 160 }) {
  const [scrollSize, setScrollSize] = useState(0);
  const [{ x }, springSet] = useSpring(() => ({ x: 0 }));
  const [{ scroll }, scrollSet] = useSpring(() => ({ scroll: 0 }));
  const { ref: parent, width: parentWidth = 425 } = useResizeObserver();
  const trackWidth = width * items.length;

  const handleChange = (value) => {
    const dragBoundary = parentWidth - trackWidth;
    springSet({ x: value });
    scrollSet({ scroll: (value * 100) / dragBoundary });
  };

  const bind = useGesture(
    {
      onDrag: (props) => {
        handleChange(props.offset[0]);
      },
      onWheel: (props) => {
        handleChange(-props.offset[1]); // * 6
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
      wheel: {
        rubberband: true,
        bounds: {
          enabled: true,
          top: parent && parentWidth - trackWidth, // / 6
          bottom: 0,
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
        {items.map((item, i) => (
          <Item
            key={i}
            width={width}
            item={item}
            prevYear={items[i - 1]?.Year}
          />
        ))}
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
`);

const Progress = styled.div`
  width: 100%;
  position: relative;
  height: 1px;
  background-color: #da0b0b;
  margin: 20px auto;
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

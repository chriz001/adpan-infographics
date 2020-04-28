import React, { forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { usePopper } from "react-popper";

const Popover = forwardRef(
  ({ referenceElement, children, color = "white", ...props }, ref) => {
    const [popperElement, setPopperElement] = React.useState(null);
    const [arrowElement, setArrowElement] = React.useState(null);
    const { styles, attributes, update } = usePopper(
      referenceElement,
      popperElement,
      {
        ...props,
        modifiers: [
          { name: "arrow", options: { element: arrowElement } },
          ...(props.modifiers || []),
        ],
      }
    );

    useImperativeHandle(ref, () => ({
      updatePopover() {
        update && update();
      },
    }));

    if (!referenceElement) return null;

    return (
      <Container
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        color={color}
      >
        {children}
        <Arrow
          data-popper-arrow
          ref={setArrowElement}
          style={styles.arrow}
          color={color}
        />
      </Container>
    );
  }
);

export default Popover;

export const Container = styled.div`
  background: ${(p) => p.color};
  padding: 20px;
  border-radius: 4px;
  text-align: left;
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 9999;

  &[data-popper-placement^="top"] > [data-popper-arrow] {
    bottom: -10px;
  }
  &[data-popper-placement^="bottom"] > [data-popper-arrow] {
    top: -10px;
  }
  &[data-popper-placement^="left"] > [data-popper-arrow] {
    right: -10px;
  }
  &[data-popper-placement^="right"] > [data-popper-arrow] {
    left: -10px;
  }
`;

export const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 20px;
    height: 20px;
    z-index: -1;
  }
  &::before {
    content: "";
    transform: rotate(45deg);
    background: ${(p) => p.color};
  }
`;

import React from "react";
import styled from "styled-components";
import { usePopper } from "react-popper";

const Popover = ({ referenceElement, children }) => {
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  if (!referenceElement) return null;

  return (
    <Container
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      {children}
      <Arrow data-popper-arrow ref={setArrowElement} style={styles.arrow} />
    </Container>
  );
};

export default Popover;

export const Container = styled.div`
  background: white;
  color: red;
  font-weight: bold;
  padding: 20px 40px;
  font-size: 18px;
  border-radius: 4px;
  text-align: left;
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.5);
  pointer-events: none;

  &[data-popper-placement^="top"] > [data-popper-arrow] {
    bottom: -4px;
  }
  &[data-popper-placement^="bottom"] > [data-popper-arrow] {
    top: -4px;
  }
  &[data-popper-placement^="left"] > [data-popper-arrow] {
    right: -4px;
  }
  &[data-popper-placement^="right"] > [data-popper-arrow] {
    left: -4px;
  }
`;

export const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }
  &::before {
    content: "";
    transform: rotate(45deg);
    background: white;
  }
`;

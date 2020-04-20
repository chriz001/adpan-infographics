import React from "react";
import styled, { keyframes } from "styled-components";

export default function Tooltip({ visible, content, children, ...rest }) {
  return (
    <Container {...rest}>
      {children}
      {visible && (
        <Content>
          <Arrow />
          {content}
        </Content>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Content = styled.div`
  color: #ffffff;
  position: absolute;
  z-index: 10;
  padding: 12px;
  font-size: 12px;
  cursor: default;
  border-radius: 4px;
  background-color: #da0b0b;
  animation: ${fadeIn} ease-in-out 0.2s;
  width: 200px;

  bottom: calc(100% + 45px);
  left: 50%;
  transform: translateX(-50%);
`;

const Arrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  bottom: -16px;
  left: calc(50% - 20px);
  border-right: 20px solid transparent;
  border-top: 16px solid #da0b0b;
  border-left: 20px solid transparent;
`;

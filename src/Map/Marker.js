import React from "react";
import styled from "styled-components";

const Marker = ({ item, coords, radius = 8, color = "white", label }) => {
  return (
    <g transform={`translate(${coords[0]}, ${coords[1]})`}>
      <circle fill={color} opacity={0.5} r={radius}></circle>
      {label && (
        <MarkerLabel dx={0} dy={6}>
          {label}
        </MarkerLabel>
      )}
      {item.size < 0.0005 && (
        <SmallLabel dx={0} dy={16}>
          {item.country}
        </SmallLabel>
      )}
    </g>
  );
};

export const MarkerLabel = styled.text`
  pointer-events: none;
  fill: white;
  text-anchor: middle;
`;

export const SmallLabel = styled(MarkerLabel)`
  fill: black;
  font-size: 10px;
`;

export default Marker;

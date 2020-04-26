import React from "react";
import styled from "styled-components";

const Marker = ({ coords, radius = 8, color = "white", label }) => {
  return (
    <g transform={`translate(${coords[0]}, ${coords[1]})`}>
      <circle fill={color} opacity={0.5} r={radius}></circle>
      {label && (
        <Label dx={0} dy={6}>
          {label}
        </Label>
      )}
    </g>
  );
};

const Label = styled.text`
  pointer-events: none;
  fill: white;
  text-anchor: middle;
`;

export default Marker;

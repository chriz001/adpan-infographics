import React from "react";

const Marker = ({ coords, radius = 4, color = "white", label }) => {
  return (
    <g transform={`translate(${coords[0]}, ${coords[1]})`}>
      <circle fill={color} opacity={0.5} r={radius}></circle>
      {label && (
        <text dx={0} dy={6} fill="white" textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
};

export default Marker;

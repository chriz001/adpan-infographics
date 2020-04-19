import React, { useRef } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";

import { geoMercator, geoPath, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import geoJson from "geojson";

import topology from "./topology";
import Marker from "./Marker";

console.log(topology);

const getColor = (status) =>
  ({
    Abolitionist: "#1ab2b8",
    "Abolitionist de facto": "#f2be1a",
    Retentionist: "#d8121b",
  }[status]);

const Map = ({ items }) => {
  const worldData = feature(topology, topology.objects.land);
  const { ref, width = 425, height = 300 } = useResizeObserver();

  const projection = geoMercator()
    .rotate([-180])
    .fitSize([width, height], worldData);

  const path = geoPath().projection(projection);

  return (
    <Wrapper ref={ref}>
      {width > 0 && (
        <svg>
          <g>
            {worldData.features.map((d, i) => {
              const item = items.find((e) => e.country === d.id);
              const color = item ? getColor(item.status) : "#dadada";
              return (
                <path
                  key={`path-${i}`}
                  d={path(d)}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={1.5}
                  onMouseOver={() => console.log(d.id)}
                />
              );
            })}
          </g>
          {
            <g>
              {items.map((item, i) => {
                const country = worldData.features.find(
                  (element) => element.id === item.country
                );
                return (
                  country && (
                    <Marker
                      key={country.id}
                      coords={projection(geoCentroid(country))}
                      radius={item.members + 10}
                      color={getColor(item.status)}
                      label={item.members}
                    />
                  )
                );
              })}
            </g>
          }
        </svg>
      )}
    </Wrapper>
  );
};

export default Map;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 500px;
  overflow: hidden;
  svg {
    width: 100%;
    height: 100%;
  }
`;

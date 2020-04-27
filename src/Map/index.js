import React, { useState } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";
import { lighten } from "polished";

import { geoMercator, geoPath, geoCentroid, geoArea } from "d3-geo";
import { feature } from "topojson-client";

import topology from "./topology";
import Popover from "../Popover";

const Map = ({ items, details, marker, legend, getColor }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);

  const worldData = feature(topology, topology.objects.land);
  const { ref, width = 425, height = 300 } = useResizeObserver();

  const projection = geoMercator()
    .rotate([-180])
    .fitSize([width, height], worldData);

  const path = geoPath().projection(projection);

  const setActive = (id) => (event) => {
    const item = items.find((e) => e.country === id);
    setActiveCountry(item);
  };

  const sortedItems = items
    .sort(function (a, b) {
      const a1 = worldData.features.find((element) => element.id === a.country);
      const b1 = worldData.features.find((element) => element.id === b.country);
      return geoArea(a1) - geoArea(b1);
    })
    .reverse();

  return (
    <Wrapper>
      <Popover referenceElement={referenceElement}>
        {React.cloneElement(details, {
          item: activeCountry,
          color: getColor(activeCountry?.status),
        })}
      </Popover>
      {legend}
      <SvgContainer ref={ref} style={{ height: width * 0.8 }}>
        {width > 0 && (
          <Svg>
            <g>
              {worldData.features.map((d, i) => {
                const item = items.find((e) => e.country === d.id);
                const color = getColor(item?.status);
                return (
                  <g
                    key={`country-${d.id}`}
                    onMouseOver={setActive(d.id)}
                    onMouseOut={setActive(null)}
                  >
                    <path
                      d={path(d)}
                      fill={color}
                      stroke="#fff"
                      strokeWidth={1.5}
                    />
                  </g>
                );
              })}
            </g>
            <g>
              {sortedItems.map((item, i) => {
                const d = worldData.features.find(
                  (element) => element.id === item.country
                );

                if (d === undefined) {
                  console.log(item);
                  return null;
                }

                const ref =
                  activeCountry?.country === d.id ? setReferenceElement : null;
                const center = projection(geoCentroid(d));

                return (
                  d && (
                    <g
                      key={`marker-${d.id}`}
                      ref={ref}
                      onMouseOver={setActive(d.id)}
                      onMouseOut={setActive(null)}
                    >
                      {React.cloneElement(marker, {
                        coords: center,
                        color: lighten(0.05, getColor(item.status)),
                        item: item,
                      })}
                      <Label
                        dy={12}
                        transform={`translate(${center[0]}, ${center[1]})`}
                      >
                        {d.id}
                      </Label>
                    </g>
                  )
                );
              })}
            </g>
          </Svg>
        )}
      </SvgContainer>
    </Wrapper>
  );
};

export default Map;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: no-wrap;
    flex-direction: row-reverse;
  }
`;

const SvgContainer = styled.div`
  flex-basis: 100%;
  height: 100vw;
  max-height: 720px;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const Label = styled.text`
  pointer-events: none;
  fill: black;
  font-size: 10px;
  text-anchor: middle;
`;

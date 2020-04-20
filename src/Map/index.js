import React, { useState } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";
import { lighten } from "polished";

import { geoMercator, geoPath, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";

import topology from "./topology";
import Marker from "./Marker";
import Popover from "./Popover";
import Details from "./Details";

const getColor = (status) =>
  ({
    Abolitionist: "#1ab2b8",
    "Abolitionist de facto": "#f2be1a",
    Retentionist: "#d8121b",
  }[status]);

const Map = ({ items }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);

  const sortedItems = items
    .sort(function (a, b) {
      return a.members - b.members;
    })
    .reverse();

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

  return (
    <Wrapper>
      <Popover referenceElement={referenceElement}>
        <Details item={activeCountry} color={getColor(activeCountry?.status)} />
      </Popover>
      <SvgContainer ref={ref} style={{ height: width * 0.8 }}>
        {width > 0 && (
          <Svg>
            <g>
              {worldData.features.map((d, i) => {
                const item = items.find((e) => e.country === d.id);
                const color = item ? getColor(item.status) : "#dadada";
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
                const ref =
                  activeCountry?.country === d.id ? setReferenceElement : null;
                return (
                  d && (
                    <g
                      key={`marker-${d.id}`}
                      ref={ref}
                      onMouseOver={setActive(d.id)}
                      onMouseOut={setActive(null)}
                    >
                      <Marker
                        coords={projection(geoCentroid(d))}
                        radius={item.members * 2 + 8}
                        color={lighten(0.05, getColor(item.status))}
                        label={item.members}
                      />
                    </g>
                  )
                );
              })}
            </g>
          </Svg>
        )}
      </SvgContainer>
      <Legend>
        <LegendItem color="#dadada">Non-Member</LegendItem>
        <LegendItem color="#1ab2b8">Abolitionist</LegendItem>
        <LegendItem color="#f2be1a">Abolitionist de facto</LegendItem>
        <LegendItem color="#d8121b">Retentionist</LegendItem>
        <Note>number = members in the country</Note>
      </Legend>
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
  }
`;

const SvgContainer = styled.div`
  flex-basis: 100%;
  height: 100vw;
  max-height: 620px;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const Legend = styled.div`
  font-size: 14px;
  white-space: nowrap;
  font-family: "league-gothic-1", sans-serif;
`;

const LegendItem = styled.div`
  margin-bottom: 8px;
  font-size: 20px;
  &::before {
    display: inline-block;
    content: "";
    width: 20px;
    height: 20px;
    background-color: ${(p) => p.color};
    border-radius: 10px;
    margin-right: 8px;
    margin-bottom: -2px;
  }
`;

const Note = styled.div`
  font-size: 14px;
`;

import React, { useState } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer/polyfilled";
import { lighten } from "polished";

import { geoMercator, geoPath, geoCentroid, geoArea } from "d3-geo";
import { feature } from "topojson-client";

import topology from "./topology";
import Popover from "../Popover";

const Map = ({ items, details, marker, legend, getColor }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [delayHandler, setDelayHandler] = useState(null);

  const worldData = feature(topology, topology.objects.features);
  const { ref, width = 425, height = 300 } = useResizeObserver();

  const projection = geoMercator()
    .rotate([-180])
    .fitSize([width, height], worldData);

  const path = geoPath().projection(projection);

  const setActive = (country) => () => {
    clearTimeout(delayHandler);
    if (country === true) return;

    if (country) {
      const item = items.find((e) => e.country === country);
      setActiveCountry(item);
    } else {
      setDelayHandler(
        setTimeout(() => {
          setActiveCountry(null);
        }, 100)
      );
    }
  };

  const data = items
    .map((item) => {
      const d = worldData.features.find(
        ({ properties: p }) => p.GEOUNIT === item.country
      );
      return {
        ...item,
        center: d && projection(geoCentroid(d)),
        size: d && geoArea(d),
      };
    })
    .sort((a, b) => a.size - b.size)
    .reverse();

  return (
    <Wrapper>
      <Popover
        referenceElement={referenceElement}
        setActive={setActive}
        country={activeCountry?.country}
      >
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
              {worldData.features.map((d) => {
                const country = d.properties.GEOUNIT;
                const item = items.find((e) => e.country === country);
                const color = getColor(item?.status);
                return (
                  <g
                    key={`country-${country}`}
                    onMouseOver={setActive(country)}
                    onMouseOut={setActive(null)}
                  >
                    <path
                      data-map={true}
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
              {data.map((item) => {
                if (item.center === undefined) {
                  console.log("Not Found:", item);
                  return null;
                }

                const ref =
                  activeCountry?.country === item.country
                    ? setReferenceElement
                    : null;

                return (
                  <g
                    key={`marker-${item.country}`}
                    ref={ref}
                    onMouseOver={setActive(item.country)}
                    onMouseOut={setActive(null)}
                  >
                    {React.cloneElement(marker, {
                      coords: item.center,
                      color: lighten(0.05, getColor(item.status)),
                      item: item,
                    })}
                  </g>
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
  line-height: 1.2;

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

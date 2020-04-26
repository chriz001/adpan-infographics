import React from "react";
import styled from "styled-components";

import Map from "./Map";
import MapMarker from "./Map/Marker";
import Legend from "./Map/Legend";

const Executions = ({ items }) => {
  return (
    <Map
      items={items}
      getColor={getColor}
      details={<Details />}
      marker={<Marker />}
      legend={<ExecutionsLegend />}
    />
  );
};

const getColor = (status) =>
  ({
    "Abolitionist in practice": "#F0B700",
    "Abolitionist for ordinary crimes only": "#E8622A",
    Retentionist: "#d8121b",
  }[status] || "#00A9B0");

const Details = ({ item, color, ...rest }) => {
  if (!item) return null;
  return (
    <Content {...rest} style={{ color: color }}>
      <Title>{item.country}</Title>
      {item.status}
    </Content>
  );
};

const Marker = ({ ...props }) => {
  return <MapMarker {...props}></MapMarker>;
};

const ExecutionsLegend = () => (
  <Legend
    title="THE DEATH PENALTY IN ASIA PACIFIC"
    getColor={getColor}
    items={[
      "Abolitionist for all crimes",
      "Abolitionist in practice",
      "Abolitionist for ordinary crimes only",
      "Retentionist",
    ]}
    note={
      <>
        Sources:
        <p>
          Death Penalty Database, Cornell Center of the Death Penalty Worldwide,
          Cornell Law School.
        </p>
        <p>
          Amnesty International. Amnesty International Global Report – Death
          Sentences and Executions 2018 © Amnesty International 2019.
        </p>
      </>
    }
  />
);

const Content = styled.div`
  width: 100%;
  font-family: "league-gothic-1", sans-serif;
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
`;

const Title = styled.div`
  font-size: 24px;
`;

export default Executions;

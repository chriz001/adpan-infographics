import React from "react";
import styled from "styled-components";

import Map from "./Map";
import MapMarker from "./Map/Marker";
import Legend from "./Map/Legend";

const Members = ({ items }) => (
  <Map
    items={items}
    getColor={getColor}
    details={<Details />}
    marker={<Marker />}
    legend={<MembersLegend />}
  />
);

const getColor = (status) =>
  ({
    Abolitionist: "#1ab2b8",
    "Abolitionist in practice": "#f2be1a",
    Retentionist: "#d8121b",
  }[status] || "#dadada");

const Details = ({ item, color, ...rest }) => {
  if (!item) return null;
  return (
    <Content {...rest} style={{ color: color }}>
      <Title>{item.country}</Title>
      {item.status}
    </Content>
  );
};

const Marker = ({ item, ...props }) => (
  <MapMarker {...props} label={item.members} radius={item.members * 2 + 8} />
);

const MembersLegend = () => (
  <Legend
    title="MEMBERS"
    getColor={getColor}
    items={[
      "Abolitionist",
      "Abolitionist in practice",
      "Retentionist",
      "Non-Member",
    ]}
    note="number = members in the country"
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

export default Members;

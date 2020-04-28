import React, { Fragment } from "react";
import styled from "styled-components";

import Map from "./Map";
import MapMarker, { MarkerLabel } from "./Map/Marker";
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
    Abolitionist: "#00A9B0",
    "Abolitionist in practice": "#F0B700",
    "Abolitionist for ordinary crimes only": "#E8622A",
    Retentionist: "#d8121b",
  }[status] || "#dadada");

const Details = ({ item, color, ...rest }) => {
  if (!item) return null;
  return (
    <Content {...rest}>
      <Title style={{ color: color }}>{item.country}</Title>
      <Status style={{ color: color }}>{item.status}</Status>
      {item.status !== "Abolitionist" && (
        <>
          <SubTitle>DATE OF LAST EXECUTION</SubTitle>
          {item.lastExecution}
          <SubTitle>CURRENT NUMBER OF DEATH ROW INMATES</SubTitle>
          {item.inmates}
          <SubTitle>METHOD(S) OF EXECUTION</SubTitle>
          {item.method}
          <Notes>
            {item.footnote.split("\n").map((item, key) => (
              <Fragment key={key}>
                {item}
                <br />
              </Fragment>
            ))}
          </Notes>
        </>
      )}
    </Content>
  );
};

const Marker = (props) => {
  let { coords: c } = props;
  if (props.item.country === "Hong Kong") c = [c[0] + 5, c[1] - 5];
  if (props.item.country === "Macau") c = [c[0] - 5, c[1]];
  return (
    <MapMarker
      {...props}
      coords={c}
      color={props.item.size > 0.0005 ? "transparent" : props.color}
    />
  );
};

const ExecutionsLegend = () => (
  <Legend
    title="THE DEATH PENALTY IN ASIA PACIFIC"
    getColor={getColor}
    items={[
      "Abolitionist",
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
  text-align: center;
  max-width: 300px;
`;

const Title = styled.div`
  font-size: 24px;
  padding: 0 20px;
  text-transform: uppercase;
  font-family: "league-gothic-1", sans-serif;
`;

const Status = styled.div`
  font-size: 18px;
  padding: 0 20px;
  text-transform: uppercase;
  font-family: "league-gothic-1", sans-serif;
`;

const SubTitle = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 20px;
`;

const Notes = styled.div`
  font-size: 12px;
  margin-top: 20px;
`;

export default Executions;

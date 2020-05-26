import React, { Fragment } from "react";
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
    Abolitionist: "#00A9B0",
    "De facto abolitionist": "#F0B700",
    "Abolitionist for ordinary crimes": "#E8622A",
    Retentionist: "#d8121b",
  }[status] || "#dadada");

const Details = ({ item, color, ...rest }) => {
  if (!item) return null;
  return (
    <Content {...rest}>
      <Title style={{ color: color }}>{item.country}</Title>
      <Status style={{ color: color }}>{item.status}</Status>
      {item.casestudy && (
        <CaseLink href={item.casestudy}> View Case Study</CaseLink>
      )}
      {item.status !== "Abolitionist" && (
        <>
          <SubTitle>DATE OF LAST EXECUTION</SubTitle>
          <div
            dangerouslySetInnerHTML={{
              __html: item.lastExecution,
            }}
          />
          <SubTitle>CURRENT NUMBER OF DEATH ROW INMATES</SubTitle>
          <div
            dangerouslySetInnerHTML={{
              __html: item.inmates,
            }}
          />
          <SubTitle>METHOD(S) OF EXECUTION</SubTitle>
          <div
            dangerouslySetInnerHTML={{
              __html: item.method,
            }}
          />
          <Notes>
            {item.footnote?.split("\n").map((item, key) => (
              <Fragment key={key}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                />
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
      "De facto abolitionist",
      "Abolitionist for ordinary crimes",
      "Retentionist",
    ]}
    note={
      <>
        Sources:
        <SourceLink href="https://dpw.pointjupiter.co/search.cfm">
          Cornell Center on the Death Penalty Worldwide, Death Penalty Database
        </SourceLink>
        <SourceLink href="https://www.amnesty.org/download/Documents/ACT5018472020ENGLISH.PDF">
          Amnesty International. Amnesty International Global Report - Death
          Sentences and Executions 2019 © Amnesty International 2020 ACT
          50/1847/2020
        </SourceLink>
        <SourceLink href="https://www.amnesty.org/download/Documents/ACT5066652017ENGLISH.pdf">
          Amnesty International, Abolitionist and Retentionist Countries as of
          July 2018 © Amnesty International July 2018 ACT 50/6665/2017
        </SourceLink>
        <SourceLink href="https://www.amnesty.org/download/Documents/ACT5098702019ENGLISH.PDF">
          Amnesty International. Amnesty International Global Report - Death
          Sentences and Executions 2018 © Amnesty International 2019 ACT
          50/9870/2019
        </SourceLink>
        <SourceLink href="https://www.amnesty.org/download/Documents/ACT5079552018ENGLISH.PDF">
          Amnesty International. Amnesty International Global Report - Death
          Sentences and Executions 2017 © Amnesty International 2018 ACT
          50/7955/2018
        </SourceLink>
        <SourceLink href="https://www.amnesty.org/download/Documents/ACT5057402017ENGLISH.PDF">
          Amnesty International. Amnesty International Global Report - Death
          Sentences and Executions 2016 © Amnesty International 2017 ACT
          50/5740/2017
        </SourceLink>
        <SourceLink href="https://www.amnesty.org/download/Documents/4000/act500012014en.pdf">
          Amnesty International, Death Sentences and Executions 2013 © Amnesty
          International Publications 2014 Act 50/001/2014
        </SourceLink>
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
  text-align: left;
  a {
    color: #b2b2b2;
  }
`;

const CaseLink = styled.a`
  font-size: 12px;
  margin: 8px 0;
  color: #b2b2b2;
`;

const SourceLink = styled.a.attrs({ target: "_blank" })`
  display: block;
  font-size: 10px;
  margin: 8px 0;
  color: #b2b2b2;
`;

export default Executions;

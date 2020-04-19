import React from "react";
import ReactDOM from "react-dom";

import "resize-observer-polyfill";
//import 'core-js/modules/es.object.entries';

import Timeline from "./Timeline";
import timelineData from "../data/timeline";

const timelineElement = document.getElementById("timeline");
if (timelineElement) {
  ReactDOM.render(<Timeline items={timelineData} />, timelineElement);
}

import Map from "./Map";
import mapData from "../data/map";

const mapElement = document.getElementById("map");
if (mapElement) {
  ReactDOM.render(<Map items={mapData} />, mapElement);
}

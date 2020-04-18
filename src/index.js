import React from "react";
import ReactDOM from "react-dom";

//import 'resize-observer-polyfill';
//import 'core-js/modules/es.object.entries';

import Timeline from "./Timeline";
import timelineData from "../data/timeline";

const timelineElement = document.getElementById("timeline");
if (timelineElement) {
  ReactDOM.render(<Timeline items={timelineData} />, timelineElement);
}

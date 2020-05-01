import "core-js/modules/es.array.fill";

import React from "react";
import ReactDOM from "react-dom";

import Timeline from "./Timeline";
import timelineData from "../data/timeline";

const timelineElement = document.getElementById("timeline");
if (timelineElement) {
  ReactDOM.render(<Timeline items={timelineData} />, timelineElement);
}

import Members from "./Members";
import membersData from "../data/members";

const membersElement = document.getElementById("members");
if (membersElement) {
  ReactDOM.render(<Members items={membersData} />, membersElement);
}

import Executions from "./Executions";
import executionsData from "../data/executions";

const executionsElement = document.getElementById("executions");
if (executionsElement) {
  ReactDOM.render(<Executions items={executionsData} />, executionsElement);
}

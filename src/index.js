import React from "react";
import ReactDOM from "react-dom";

import Timeline from "./Timeline";
import timelineData from "../data/timeline";

const timelineElement = document.getElementById("timeline");
ReactDOM.render(<Timeline items={timelineData} />, timelineElement);

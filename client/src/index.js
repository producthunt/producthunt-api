import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

require("es6-promise").polyfill();
require("isomorphic-fetch");

ReactDOM.render(<App />, document.getElementById("root"));

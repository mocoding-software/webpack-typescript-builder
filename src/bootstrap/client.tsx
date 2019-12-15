import * as React from "react";
import * as ReactDOM from "react-dom";

// @ts-ignore
import App from "injected-app-module";
import { Wrapper } from "./wrapper";

const element = document.getElementById("app");
ReactDOM.hydrate(
  <Wrapper>
    <App />
  </Wrapper>,
  element
);

if (module.hot) {
  module.hot.accept();
}

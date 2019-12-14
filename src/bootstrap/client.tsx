import * as React from "react";
import * as ReactDOM from "react-dom";

// @ts-ignore
import App from "injected-app-module";

const element = document.getElementById("app");
ReactDOM.hydrate(<App />, element);

if (module.hot) {
  module.hot.accept();
}
// module.hot.accept()"../app", () => {
//     const { App } = require("injected-app-module");

//     ReactDOM.hydrate(<App />, element);

// });

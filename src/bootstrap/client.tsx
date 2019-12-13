// const App = require("injected-app-module")();
import App from "injected-app-module";
import * as ReactDOM from "react-dom"
import * as React from "react"
var element = document.getElementById("app");
ReactDOM.hydrate(<App />, element);


if (module.hot)
  module.hot.accept()
    // module.hot.accept()"../app", () => {
    //     const { App } = require("injected-app-module");       

    //     ReactDOM.hydrate(<App />, element);

    // });

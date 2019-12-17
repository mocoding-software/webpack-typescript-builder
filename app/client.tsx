import * as React from "react";
import * as ReactDOM from "react-dom";

// @ts-ignore
import * as AppModule from "injected-app-module";
import { Wrapper } from "./wrapper";

const context: any = {};

function render(App: React.ComponentType) {
  const element = document.getElementById("app");
  ReactDOM.hydrate(
    <Wrapper context={context}>
      <App />
    </Wrapper>,
    element,
  );
}

render(AppModule.App);

// if (module.hot) {
//   module.hot.accept(["injected-app-module"], () => {
//     const { App } = require<typeof AppModule>("injected-app-module");
//     render(App);
//   });
// }

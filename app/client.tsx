/// <reference types="webpack-env" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Context } from "./common";

// @ts-ignore
import * as AppModule from "injected-flavor-module";

const context: Context = AppModule.createContext();
const element = document.getElementById("app");

ReactDOM.hydrate(<AppModule.App context={context} />, element);

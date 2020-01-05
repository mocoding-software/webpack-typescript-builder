import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Component } from "./component";
import "./index.scss";

import "./favicon.ico";

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Helmet>
        Hello World
        <Component />
      </div>
    );
  }
}

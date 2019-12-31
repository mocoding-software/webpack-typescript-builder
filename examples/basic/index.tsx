import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Component } from "./component";
import "./index.scss";

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        Hello World
        <Component />
      </div>
    );
  }
}

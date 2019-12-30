import * as React from "react";
import { Helmet } from "react-helmet-async";
import "./index.scss";

import img from "./image.png";

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        Hello World
        <img src={img} alt="test-image" />
      </div>
    );
  }
}

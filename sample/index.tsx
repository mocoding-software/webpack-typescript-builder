import * as React from "react";
import "./index.scss";
const img = require("./image.png").default;

export default class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        Hello World!
        <img src={img} alt="test-image" />
      </div>
    );
  }
}

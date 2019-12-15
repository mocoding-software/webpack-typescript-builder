import * as React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import "./index.scss";

const img = require("./image.png").default;

interface IAppProps {
  helmetContext?: any;
}

export default class App extends React.Component<IAppProps> {
  public render(): JSX.Element {
    return (
      <HelmetProvider context={this.props.helmetContext}>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        Hello World!!!
        <img src={img} alt="test-image" />
      </HelmetProvider>
    );
  }
}

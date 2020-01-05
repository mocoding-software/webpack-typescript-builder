import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { StarsPage } from "./pages/stars";

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route exact={true} path="/" component={StarsPage} />
      </Switch>
    );
  }
}

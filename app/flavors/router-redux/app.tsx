import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { AppProps } from "../../common";
import { HelmetWrapper } from "../../components";

// @ts-ignore
import * as AppModule from "injected-app-module";

export class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <HelmetWrapper helmetContext={this.props.context.helmetContext}>
        <Provider store={this.props.context.store}>
          <ConnectedRouter history={this.props.context.history}>
            <AppModule.App />
          </ConnectedRouter>
        </Provider>
      </HelmetWrapper>
    );
  }
}

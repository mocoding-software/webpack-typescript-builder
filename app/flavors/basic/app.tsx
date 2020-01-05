import * as React from "react";
import { AppProps } from "../../common";
import { HelmetWrapper } from "../../components";

// @ts-ignore
import * as InjectedAppModule from "injected-app-entry";

export class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    return (
      <HelmetWrapper helmetContext={this.props.context.helmetContext}>
        <InjectedAppModule.App />
      </HelmetWrapper>
    );
  }
}

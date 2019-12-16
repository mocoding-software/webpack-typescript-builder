import * as React from "react";
import { Provider } from "react-redux";
import { WrapperProps } from "../common";

export class ReduxWrapper extends React.Component<WrapperProps> {
  public render(): React.ReactNode {
    return (
      <Provider store={this.props.context.store}>
        {this.props.children}
      </Provider>
    );
  }
}

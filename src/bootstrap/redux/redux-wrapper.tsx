import * as React from "react";
import { Provider } from "react-redux";

interface ReduxWrapperProps {
  store: any;
}

export class ReduxWrapper extends React.Component<ReduxWrapperProps> {
  public render(): JSX.Element {
    return (
      <Provider store={this.props.store}>
        {this.props.children}
      </Provider>
    );
  }
}

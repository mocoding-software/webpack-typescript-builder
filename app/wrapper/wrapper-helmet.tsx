import * as React from "react";
import { HelmetProvider } from "react-helmet-async";
import { WrapperProps } from "../common";

export class HelmetWrapper extends React.Component<WrapperProps> {
  public render(): React.ReactNode {
    return (
      <HelmetProvider context={this.props.context.helmetContext}>
        {this.props.children}
      </HelmetProvider>
    );
  }
}

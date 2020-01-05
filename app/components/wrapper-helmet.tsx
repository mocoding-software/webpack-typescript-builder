import * as React from "react";
import { HelmetProvider } from "react-helmet-async";

export interface HelmetWrapperProps {
  helmetContext?: any;
}

export class HelmetWrapper extends React.Component<HelmetWrapperProps> {
  public render(): React.ReactNode {
    return (
      <HelmetProvider context={this.props.helmetContext}>
        {this.props.children}
      </HelmetProvider>
    );
  }
}

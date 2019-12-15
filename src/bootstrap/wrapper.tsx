import * as React from "react";
import { HelmetProvider } from "react-helmet-async";

interface IWrapperProps {
  helmetContext?: any;
}

export class Wrapper extends React.Component<IWrapperProps> {
  public render(): JSX.Element {
    return (
      <HelmetProvider context={this.props.helmetContext}>
        {this.props.children}
      </HelmetProvider>
    );
  }
}

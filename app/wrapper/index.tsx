import * as React from "react";
import { WrapperProps } from "../common";

import HelmetWrapper from "./wrapper-helmet";

// @ts-ignore
import ReduxWrapper from "injected-redux-wrapper";

export class Wrapper extends React.Component<WrapperProps> {
  public render(): React.ReactNode {
    return (
      <HelmetWrapper context={this.props.context}>
        <ReduxWrapper context={this.props.context}>
          {this.props.children}
        </ReduxWrapper>
      </HelmetWrapper>
    );
  }
}

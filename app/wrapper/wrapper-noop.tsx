import * as React from "react";
import { WrapperProps } from "../common";

export default class WrapperNoop extends React.Component<WrapperProps> {
    public render(): React.ReactNode {    
      return <div>{this.props.children}</div>;
    }
  }
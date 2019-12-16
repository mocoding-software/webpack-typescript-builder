import * as React from "react";
import { WrapperProps } from "../common";

export class WrapperNoop extends React.Component<WrapperProps> {
    public render(): React.ReactNode {    
      return this.props.children;
    }
  }
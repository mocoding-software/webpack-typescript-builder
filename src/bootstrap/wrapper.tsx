import * as React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ReduxWrapper, store } from "./redux";

interface IContext {
  helmetContext?: any
  store?: any
}

interface IWrapperProps {
  context?: any  
}

export class Wrapper extends React.Component<IWrapperProps> {
  public render(): JSX.Element {
    if (this.props.context)
      this.props.context.store = store    
    return (
      <HelmetProvider context={this.props.context?.helmetContext}>
        <ReduxWrapper store={store}>
          {this.props.children}
        </ReduxWrapper>
      </HelmetProvider>
    );
  }
}

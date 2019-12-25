import * as React from "react";
import { AppProps } from "../../common";
import { HelmetWrapper } from "../../components";

// @ts-ignore
import * as AppModule from "injected-app-module";

interface AppState {
  injectedApp: React.ComponentType;
}

export class App extends React.Component<AppProps> {
  /**
   *
   */
  // constructor(props: AppProps) {
  //   super(props);

  //   this.state = {
  //     injectedApp: AppModule.App,
  //   };
  // }
  // public componentDidMount() {
  //   if (module.hot) {
  //     console.log("setting up");
  //     console.log(module.hot.data);
  //     module.hot.accept(["injected-app-module"], () => {
  //       const newModule = require<typeof AppModule>("injected-app-module");
  //       this.setState({ injectedApp: newModule.App });
  //       console.log("fire");
  //     });
  //     module.hot.accept();
  //   }
  // }
  public render(): React.ReactNode {
    // const InjectedApp = this.state.injectedApp;
    return (
      <HelmetWrapper helmetContext={this.props.context.helmetContext}>
        <AppModule.App />
      </HelmetWrapper>
    );
  }
}

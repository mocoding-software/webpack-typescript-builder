import * as React from "react";
import { Helmet } from "react-helmet-async";

import { connect } from "react-redux";

interface AppProps {
  counter: number;
}
interface AppDispatch {
  increment: () => void;
  decrement: () => void;
}

class AppInternal extends React.Component<AppProps & AppDispatch, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Helmet>
          <title>Redux Example</title>
        </Helmet>
        Counter: {this.props.counter}
        <p>
          <button onClick={this.props.increment}>Increment</button>
          <button onClick={this.props.decrement}>Decrement</button>
        </p>
      </div>
    );
  }
}

const App = connect<AppProps, AppDispatch, {}, any>(
  state => ({
    counter: state.counter
  }),
  dispatch => ({
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" })
  })
)(AppInternal);

export { App };

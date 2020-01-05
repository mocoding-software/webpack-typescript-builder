import * as React from "react";
import { Helmet } from "react-helmet-async";

import { connect } from "react-redux";
import { fetchStarsAction } from "../store";

interface AppProps {
  stars?: number;
}
interface AppDispatch {
  loadData: () => void;
}

class StarsPageInternal extends React.Component<AppProps & AppDispatch> {
  /**
   *
   */
  constructor(props: AppProps & AppDispatch) {
    super(props);

    if (props.stars == null) {
      props.loadData();
    }
  }
  public render(): JSX.Element {
    return (
      <div>
        <Helmet>
          <title>Fetching Stars Example</title>
        </Helmet>
        Stars: {this.props.stars ? this.props.stars : "loading..."}
      </div>
    );
  }
}

const StarsPage = connect<AppProps, AppDispatch, {}, any>(
  state => ({
    stars: state.stars,
  }),
  dispatch => ({
    loadData: () => dispatch(fetchStarsAction() as any),
  }),
)(StarsPageInternal);

export { StarsPage };

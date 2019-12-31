import * as React from "react";

import img from "./image.png";

export class Component extends React.Component {
  public render(): React.ReactNode {
    return [
      <img key="image" src={img} alt="test-image" />,
      <span key="text">And happy new year!</span>,
    ];
  }
}

import * as React from "react";

export interface HeadProps {
  stylesheets: string[];
  inlineScripts?: string[];
}

export class Head extends React.Component<HeadProps> {
  public render() {
    const { inlineScripts, stylesheets: cssStyles } = this.props;

    const renderStyles = cssStyles.map((styleRef, i) => (
      <link key={i} rel="stylesheet" type="text/css" href={styleRef} />
    ));

    const renderInlineScripts = inlineScripts.map((script, i) => (
      <script
        key={i}
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: script }}
        charSet="utf-8"
      />
    ));

    return (
      <head>
        {this.props.children}
        {renderInlineScripts}
        {renderStyles}
      </head>
    );
  }
}

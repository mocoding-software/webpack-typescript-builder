import * as React from "react";

export interface BodyProps {
  bodyAttrs?: any;
  markup: string;
  scripts: string[];
  preloadState?: string;
  inlineScripts?: string[];
}

export class Body extends React.Component<BodyProps> {
  public render() {
    const { scripts, markup, bodyAttrs } = this.props;

    const type = process.env.SCRIPTS_TYPE;

    const renderScripts = scripts.map((scriptSrc, i) => (
      <script type={type} src={scriptSrc} key={i} charSet="utf-8" />
    ));

    const renderInlineScripts = this.getInlineScripts().map((script, i) => (
      <script
        key={i}
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: script }}
        charSet="utf-8"
      />
    ));

    return (
      <body {...bodyAttrs}>
        <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
        {renderInlineScripts}
        {renderScripts}
      </body>
    );
  }

  private getInlineScripts(): string[] {
    const scripts: string[] = this.props.inlineScripts || [];

    if (this.props.preloadState) {
      scripts.push(
        `window.__PRELOADED_STATE__=${JSON.stringify(
          JSON.stringify(this.props.preloadState),
        )};\n`,
      );
    }

    return scripts;
  }
}

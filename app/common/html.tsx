import * as React from "react";

export interface HtmlProps {
  styles?: string[];
  scripts?: string[];
  inlineScripts?: string[];
  markup: string;
  context: any;
  settings?: any;
}

export class Html extends React.Component<HtmlProps> {
  public render(): JSX.Element {
    const { markup, styles, scripts } = this.props;

    const renderStyles = this.getOrEmpty(styles).map((styleRef, i) => (
      <link key={i} rel="stylesheet" type="text/css" href={styleRef} />
    ));

    const renderScripts = this.getOrEmpty(scripts).map((scriptSrc, i) => (
      <script src={scriptSrc} key={i} charSet="utf-8" />
    ));

    const renderInlineScripts = this.getInlineScripts().map(
      (inlineScript, i) => (
        <script
          key={i}
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: inlineScript }}
          charSet="utf-8"
        />
      )
    );

    const helmet = this.props.context.helmetContext.helmet;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {renderStyles}
        </head>
        <body {...bodyAttrs}>
          <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          {renderInlineScripts}
          {renderScripts}
        </body>
      </html>
    );
  }

  private getOrEmpty<T>(array?: T[]): T[] {
    return array || [];
  }

  private getInlineScripts(): string[] {
    var scripts = this.props.inlineScripts || [];

    var defaultInlineScript = "";
    if (this.props.settings) {
      defaultInlineScript += `window.__SETTINGS__=${JSON.stringify(
        this.props.settings
      )};\n`;
    }

    const reduxState = this.props.context.store?.getState();

    if (reduxState) {
      defaultInlineScript += `window.__PRELOADED_STATE__=${JSON.stringify(
        JSON.stringify(reduxState)
      )};\n`;
    }

    if (defaultInlineScript.length > 0)
      scripts = [defaultInlineScript, ...scripts];

    return scripts;
  }
}

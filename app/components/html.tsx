import * as React from "react";
import { Context } from "../common/context";
import { InlineScript } from "../common/renderFunc";

export interface HtmlProps {
  assets: string[];
  markup: string;
  context: Context;
  inlineScripts?: InlineScript[];
}

export class Html extends React.Component<HtmlProps> {
  public render(): JSX.Element {
    const { markup, assets } = this.props;

    const renderStyles = assets
      .filter(_ => _.endsWith(".css"))
      .map((styleRef, i) => (
        <link key={i} rel="stylesheet" type="text/css" href={styleRef} />
      ));

    const renderScripts = assets
      .filter(_ => _.endsWith(".js"))
      .map((scriptSrc, i) => (
        <script src={scriptSrc} key={i} charSet="utf-8" />
      ));

    const inlineScripts = this.getInlineScripts();
    const renderTopInlineScripts = inlineScripts
      .filter(_ => _.position === "top")
      .map((inlineScript, i) => (
        <script
          key={i}
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: inlineScript.script }}
          charSet="utf-8"
        />
      ));
    const renderBottomInlineScripts = inlineScripts
      .filter(_ => _.position === "bottom")
      .map((inlineScript, i) => (
        <script
          key={i}
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: inlineScript.script }}
          charSet="utf-8"
        />
      ));

    const helmet = this.props.context.helmetContext.helmet;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {renderTopInlineScripts}
          {renderStyles}
        </head>
        <body {...bodyAttrs}>
          <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          {renderBottomInlineScripts}
          {renderScripts}
        </body>
      </html>
    );
  }

  private getInlineScripts(): InlineScript[] {
    const scripts: InlineScript[] = this.props.inlineScripts || [];

    const reduxState = this.props.context.store?.getState();

    if (reduxState) {
      scripts.push({
        position: "bottom",
        script: `window.__PRELOADED_STATE__=${JSON.stringify(
          JSON.stringify(reduxState),
        )};\n`,
      });
    }

    return scripts;
  }
}

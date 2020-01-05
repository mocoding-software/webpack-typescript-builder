import * as React from "react";
import { Context } from "../common/context";
import { InlineScript } from "../common/renderFunc";
import { Html } from "./html";

export interface HelmetHtmlProps {
  assets: string[];
  markup: string;
  context: Context;
  inlineScripts?: InlineScript[];
}

export class HelmetHtml extends React.Component<HelmetHtmlProps> {
  public render(): JSX.Element {
    const { assets, context, markup, inlineScripts } = this.props;
    const helmet = this.props.context.helmetContext.helmet;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    const htmlProps = {
      assets,
      bodyAttrs,
      htmlAttrs,
      inlineScripts,
      markup,
      preloadState: context.store?.getState(),
    };

    return (
      <Html {...htmlProps}>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </Html>
    );
  }
}

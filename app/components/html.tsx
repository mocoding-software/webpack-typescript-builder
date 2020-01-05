import * as React from "react";
import { InlineScript } from "../common/renderFunc";
import { Body } from "./body";
import { Head } from "./head";

export interface HtmlProps {
  assets: string[];
  bodyAttrs?: any;
  htmlAttrs?: any;
  markup: string;
  inlineScripts?: InlineScript[];
  preloadState?: any;
}

export class Html extends React.Component<HtmlProps> {
  public render(): JSX.Element {
    const {
      markup,
      assets,
      inlineScripts,
      htmlAttrs,
      bodyAttrs,
      preloadState,
    } = this.props;

    const stylesheets = assets.filter(_ => _.endsWith(".css"));

    const scripts = assets.filter(_ => _.endsWith(".js"));

    const topInlineScripts = (inlineScripts || [])
      .filter(_ => _.position === "top")
      .map(_ => _.script);

    const bottomInlineScripts = (inlineScripts || [])
      .filter(_ => _.position === "bottom")
      .map(_ => _.script);

    return (
      <html {...htmlAttrs}>
        <Head stylesheets={stylesheets} inlineScripts={topInlineScripts}>
          {this.props.children}
        </Head>
        <Body
          bodyAttrs={bodyAttrs}
          scripts={scripts}
          markup={markup}
          inlineScripts={bottomInlineScripts}
          preloadState={preloadState}
        />
      </html>
    );
  }
}

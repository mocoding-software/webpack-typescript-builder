import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// ../../app/common -> "webpack-typescript-builder/app/common"
// ../../app/components -> "webpack-typescript-builder/app/components"
import { RenderCallback, RenderFuncProps } from "../../app/common";
import { Html, HtmlProps } from "../../app/components";

export default function render(
  callback: RenderCallback,
  props: RenderFuncProps,
): void {
  try {
    const htmlProps: HtmlProps = {
      assets: props.assets,
      inlineScripts: props.inlineScripts,
      markup: "",
    };

    const html = renderToStaticMarkup(
      <Html {...htmlProps}>
        <title>Custom SSR</title>
      </Html>,
    );

    callback(undefined, {
      html,
    });
  } catch (error) {
    callback(error);
  }
}

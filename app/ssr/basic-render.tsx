import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { RenderCallback, RenderFuncProps } from "../common";
import { Wrapper } from "../wrapper";
import { Html, HtmlProps } from "./html";

// @ts-ignore
import * as AppModule from "injected-app-module";

export default function render(
  callback: RenderCallback,
  props: RenderFuncProps,
): void {
  try {
    const context: any = {
      helmetContext: {},
    };
    const app = (
      <Wrapper context={context}>
        <AppModule.App />
      </Wrapper>
    );
    const markup = renderToString(app);

    const htmlProps: HtmlProps = {
      assets: props.assets,
      context,
      inlineScripts: props.inlineScripts,
      markup,
    };

    const html = renderToStaticMarkup(<Html {...htmlProps} />);

    callback(null, {
      html,
    });
  } catch (error) {
    callback(error);
  }
}

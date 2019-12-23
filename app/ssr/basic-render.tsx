import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Html, HtmlProps, RenderCallback } from "../common";
import { Wrapper } from "../wrapper";

// @ts-ignore
import * as AppModule from "injected-app-module";

export default function render(
  callback: RenderCallback,
  requestUrl: string,
  assets: string[],
  settings?: any,
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
      assets,
      context,
      markup,
      settings,
    };

    const html = renderToStaticMarkup(<Html {...htmlProps} />);

    callback(null, {
      html,
    });
  } catch (error) {
    callback(error);
  }
}

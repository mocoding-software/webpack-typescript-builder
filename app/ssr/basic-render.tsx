import * as React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { Html, HtmlProps } from "../common";
import { Wrapper } from "../wrapper";

// @ts-ignore
import { App } from "injected-app-module";

export default function render(url: string, assets: string[], settings: any = undefined): string {
  const context: any = {
    helmetContext: {},
  };
  const app = (
    <Wrapper context={context}>
      <App />
    </Wrapper>
  );
  const markup = renderToString(app);

  const htmlProps: HtmlProps = {
    markup,
    context,
    settings,
    assets,
  };

  return renderToStaticMarkup(<Html {...htmlProps} />);
}

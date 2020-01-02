import { createMemoryHistory } from "history";
import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Context, RenderCallback, RenderFuncProps } from "../../common";
import { HelmetHtml, HelmetHtmlProps } from "../../components";
import { App } from "./app";
import { createContext } from "./createContext";

export function render(callback: RenderCallback, props: RenderFuncProps): void {
  try {
    const history = createMemoryHistory();
    history.replace(props.requestUrl);
    const context: Context = createContext(history);
    context.helmetContext = {}; // init helmet for ssr
    const markup = renderToString(<App context={context} />);

    const htmlProps: HelmetHtmlProps = {
      assets: props.assets,
      context,
      inlineScripts: props.inlineScripts,
      markup,
    };

    const html = renderToStaticMarkup(<HelmetHtml {...htmlProps} />);

    callback(undefined, {
      html,
    });
  } catch (error) {
    callback(error);
  }
}

import {
  baseUrl as domainTaskBaseUrl,
  run as domainTaskRun,
} from "domain-task";
import { createMemoryHistory } from "history";
import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import * as url from "url";
import { Context, RenderCallback, RenderFuncProps } from "../../common";
import { HelmetHtml, HelmetHtmlProps } from "../../components";
import { App } from "../router-redux/app";
import { createContext } from "../router-redux/createContext";

export function render(callback: RenderCallback, props: RenderFuncProps): void {
  try {
    const location = url.parse(props.requestUrl);
    const history = createMemoryHistory();
    history.replace(location);
    const context: Context = createContext(history);
    context.helmetContext = {}; // init helmet for ssr
    const app = <App context={context} />;
    let firstError: any = null;
    const timeout = props.timeout || 5;
    const timeoutTimer = setTimeout(() => {
      callback(
        new Error(`Cannot complete prerendering withing ${timeout} second`),
      );
    }, timeout * 1000);

    const completionCallback = errorOrNothing => {
      clearTimeout(timeoutTimer);
      if (firstError) {
        return;
      }
      if (errorOrNothing) {
        firstError = errorOrNothing;
        callback(errorOrNothing);
      } else {
        const markup = renderToString(app);

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
      }
    };
    domainTaskRun(() => {
      domainTaskBaseUrl(props.baseUrl);
      renderToString(app);
    }, completionCallback);
  } catch (error) {
    callback(error);
  }
}

import {
  baseUrl as domainTaskBaseUrl,
  run as domainTaskRun,
} from "domain-task/main";
import { createMemoryHistory } from "history";
import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Context, RenderCallback, RenderFuncProps } from "../../common";
import { HelmetHtml, HelmetHtmlProps } from "../../components";
import { App } from "../router-redux/app";
import { createContext } from "../router-redux/createContext";

export function render(callback: RenderCallback, props: RenderFuncProps): void {
  try {
    const history = createMemoryHistory();
    history.replace(props.requestUrl);
    const context: Context = createContext(history);
    context.helmetContext = {}; // init helmet for ssr
    const app = <App context={context} />;
    let firstError: any = null;
    const timeoutTimer = setTimeout(() => {
      callback(new Error("Cannot complete prerendering withing 5 second"));
    }, 5000);
    domainTaskRun(
      () => {
        domainTaskBaseUrl("http://localhost:5000");
        renderToString(app);
      },
      /* completion callback */ errorOrNothing => {
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
      },
    );
  } catch (error) {
    callback(error);
  }
}

import * as domain from "domain";
import {
  baseUrl as domainTaskBaseUrl,
  run as domainTaskRun,
} from "domain-task/main";
import { createMemoryHistory } from "history";
import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Context, RenderCallback, RenderFuncProps } from "../../common";
import { Html, HtmlProps } from "../../components";
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
    domainTaskRun(
      () => {
        domainTaskBaseUrl("http://localhost:5000");
        renderToString(app);
      },
      /* completion callback */ errorOrNothing => {
        if (firstError) {
          return;
        }
        if (errorOrNothing) {
          firstError = errorOrNothing;
          callback(errorOrNothing);
        } else {
          const markup = renderToString(app);

          const htmlProps: HtmlProps = {
            assets: props.assets,
            context,
            inlineScripts: props.inlineScripts,
            markup,
          };

          const html = renderToStaticMarkup(<Html {...htmlProps} />);

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

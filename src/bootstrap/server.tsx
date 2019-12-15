import * as React from "react";
import * as Webpack from "webpack";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { Html, HtmlProps } from "./html";

interface IServerRenderStats {
  clientStats: Webpack.Stats;
}

// @ts-ignore
import App from "injected-app-module";

function serverRenderer(stats: IServerRenderStats) {
  return (req: any, res: any, next: any) => {
    const helmetContext: any = {};
    const app = <App helmetContext={helmetContext} />;
    const markup = renderToString(app);
    const htmlProps: HtmlProps = {
      markup,
      helmet: helmetContext.helmet
    };    
    res.status(200).send(renderToStaticMarkup(<Html {...htmlProps} />));
    //     res.status(200).send(
    //       `<!doctype html>
    //   <html>
    //   <head>
    //       <title>Test</title>
    //   </head>
    //   <body>
    //       <div id="app">${renderToString(React.createElement(App))}</div>
    //       <script src="/vendors.js"></script>
    //       <script src="/index.js"></script>
    //   </body>
    //   </html>
    // `
    //     );
  };
}

export default serverRenderer;

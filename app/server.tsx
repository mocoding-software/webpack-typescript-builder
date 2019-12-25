import * as React from "react";
import * as ReactDom from "react-dom/server";
import * as Webpack from "webpack";
import {
  RedirectResult,
  RenderCallback,
  RenderFuncProps,
  RenderHtmlResult,
} from "./common";
import render from "./ssr";

interface ServerRenderStats {
  clientStats: Webpack.Stats;
}

function serverRenderer(stats: ServerRenderStats) {
  return (req: any, res: any, next: any) => {
    if (req.url === "/") {
      const assets = res.locals.webpackStats.stats[0].toJson()
        .assetsByChunkName;
      const assetsUrls: string[] = [].concat.apply([], Object.values(assets));
      const callback: RenderCallback = (error, result) => {
        if (error) {
          res
            .status(500)
            .write(ReactDom.renderToStaticMarkup(renderError(error)));
        } else if (result) {
          const htmlResult = result as RenderHtmlResult;
          if (htmlResult.html) {
            res.status(200).send(htmlResult.html);
          } else {
            const redirectResult = result as RedirectResult;
            res.redirect(301, redirectResult.redirectUrl);
          }
        }
      };
      const props: RenderFuncProps = {
        assets: assetsUrls,
        requestUrl: req.url,
      };
      render(callback, props);
    } else {
      res.status(404).send();
    }
  };
}

const renderError = (error: Error) => {
  return (
    <html>
      <head>
        <title>Error</title>
      </head>
      <body>
        <pre>{error.stack}</pre>
      </body>
    </html>
  );
};

export default serverRenderer;

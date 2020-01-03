import * as Webpack from "webpack";
import {
  RedirectResult,
  RenderCallback,
  RenderFuncProps,
  RenderHtmlResult,
} from "./common";

// @ts-ignore
import render from "injected-ssr-module";

interface ServerRenderStats {
  clientStats: Webpack.Stats;
}

function serverRenderer(stats: ServerRenderStats) {
  return (req: any, res: any, next: any) => {
    process.stdout.write(`Request ${req.originalUrl}\n`);
    const assets = res.locals.webpackStats.stats[0].toJson().assetsByChunkName;
    const assetsUrls: string[] = [].concat.apply([], Object.values(assets));
    const port = process.env.PORT;
    const baseUrl =
      "http://localhost" +
      (typeof port !== "undefined" ? ":5000" : `:${req.socket.localPort}`);
    console.log(baseUrl);
    const callback: RenderCallback = (error, result) => {
      if (error) {
        return next(error);
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
      baseUrl,
      requestUrl: req.originalUrl,
    };
    render(callback, props);
  };
}

export default serverRenderer;

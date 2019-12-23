import * as Webpack from "webpack";
import { RedirectResult, RenderCallback, RenderHtmlResult } from "./common";
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
          res.status(500).write(error);
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
      render(callback, req.url, assetsUrls);
    } else {
      res.status(404).send();
    }
  };
}

export default serverRenderer;

import * as Webpack from "webpack";
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
      res.status(200).send(render(req.url, assetsUrls));
    } else {
      res.status(404).send();
    }
  };
}

export default serverRenderer;

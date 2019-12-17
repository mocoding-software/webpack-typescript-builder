import * as React from "react";
import * as Webpack from "webpack";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { Html, HtmlProps } from "./common";
import { Wrapper } from "./wrapper";

interface IServerRenderStats {
  clientStats: Webpack.Stats;
}

// @ts-ignore
import { App } from "injected-app-module";

function serverRenderer(stats: IServerRenderStats) {
  return (req: any, res: any, next: any) => {
    if (req.url == "/") {
      const assets = res.locals.webpackStats.stats[0].toJson().assetsByChunkName;
      const assetsUrls: any = [].concat.apply([], Object.values(assets));
      console.log(assetsUrls);
      res.status(200).send(render(req.url, assetsUrls));
    }
    else {
      res.status(404).send();
    }
  };
}

export function render(url: string, assets: string[]): string {
  const context: any = {
    helmetContext: {}
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
    styles: assets.filter((path: any) => path.endsWith(".css")),
    scripts: assets.filter((path: any) => path.endsWith(".js")),
  };

  return renderToStaticMarkup(<Html {...htmlProps} />);
}

export default serverRenderer;

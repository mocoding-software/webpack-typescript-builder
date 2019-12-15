import * as React from "react";
import * as Webpack from "webpack";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { Html, HtmlProps } from "./html";
import {Wrapper} from "./wrapper"

interface IServerRenderStats {
  clientStats: Webpack.Stats;
}

// @ts-ignore
import App from "injected-app-module";

function serverRenderer(stats: IServerRenderStats) {
  return (req: any, res: any, next: any) => {
    const helmetContext: any = {};
    const app = <Wrapper helmetContext={helmetContext} ><App/></Wrapper>;
    const markup = renderToString(app);
    
    const assetsByChunkName = res.locals.webpackStats.stats[0].toJson().assetsByChunkName;
    const assets: any = [].concat.apply([], Object.values(assetsByChunkName));

    const htmlProps: HtmlProps = {
      markup,
      helmet: helmetContext.helmet,
      styles: assets.filter((path: any) => path.endsWith('.css')),
      scripts: assets.filter((path: any) => path.endsWith('.js'))
    };        

    res.status(200).send(renderToStaticMarkup(<Html {...htmlProps} />));
  };
}

export default serverRenderer;

import program from "commander"
import webpack from "webpack";
import express from "express";
//import middleware from "webpack-dev-middleware"
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require("webpack-hot-middleware");
import { createConfig } from "./config";

function serve(dir: string) {
    console.log(dir)
    const config = createConfig(dir)
    const compiler = webpack(config);
    const app = express();

    app.use(devMiddleware(compiler, { serverSideRender: true }));
    app.use(hotMiddleware(compiler));

    // The following middleware would not be invoked until the latest build is finished.
    app.use((req, res) => {          
        const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
        const fs = res.locals.fs;
        const outputPath = res.locals.webpackStats.toJson().outputPath;

        const assets = [].concat.apply([], Object.values(assetsByChunkName));

        // then use `assetsByChunkName` for server-sider rendering
        // For example, if you have only one main chunk:
        res.send(`
        <html>
        <head>
            <title>My App</title>
            ${assets
              .filter((path: any) => path.endsWith('.css'))
              .map((path: any) => `<link rel="stylesheet" type="text/css" href="${path}" />`)
              .join('\n')}            
        </head>
        <body>
            <div id="app"></div>
            ${assets
                .filter((path: any) => path.endsWith('.js'))
                .map((path: any) => `<script src="${path}"></script>`)
                .join('\n')}
        </body>
        </html>
        `);
    });
    console.log("Starting server...")
    app.listen(3000, () => console.log('Example app listening on port 3000!'));    
}

program.command("serve <dir>").action(serve)

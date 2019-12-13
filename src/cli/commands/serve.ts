import webpack from "webpack";
import express from "express";
//import middleware from "webpack-dev-middleware"
const middleware = require('webpack-dev-middleware');
import { createConfig } from "./config";
const isObject = require('is-object');

function normalizeAssets(assets: any) {
    console.log(assets);
    if (isObject(assets)) {
         return Object.values(assets);
    }

    return Array.isArray(assets) ? assets : [assets];
}

export function serve(dir: string) {
    console.log(dir)
    const config = createConfig(dir)
    const compiler = webpack(config);
    const app = express();

    app.use(middleware(compiler, { serverSideRender: true }));

    // The following middleware would not be invoked until the latest build is finished.
    app.use((req, res) => {          
        const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
        const fs = res.locals.fs;
        const outputPath = res.locals.webpackStats.toJson().outputPath;

        // then use `assetsByChunkName` for server-sider rendering
        // For example, if you have only one main chunk:
        res.send(`
        <html>
        <head>
            <title>My App</title>
            <style>
            ${normalizeAssets(assetsByChunkName.main)
                .filter((path: any) => path.endsWith('.css'))
                .map((path: any) => fs.readFileSync(outputPath + '/' + path))
                .join('\n')}
            </style>
        </head>
        <body>
            <div id="root"></div>
            ${normalizeAssets(assetsByChunkName.main)
                .filter((path: any) => path.endsWith('.js'))
                .map((path: any) => `<script src="${path}"></script>`)
                .join('\n')}
        </body>
        </html>
        `);
    });
    console.log("Starting server...")
    app.listen(3000, () => console.log('Example app listening on port 3000!'));
    setTimeout(() => console.log("closing"), 60000);
}

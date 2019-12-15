import program from "commander"
import webpack from "webpack";
import express from "express";
//import middleware from "webpack-dev-middleware"
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require("webpack-hot-middleware");
const hotServerMiddleware = require('webpack-hot-server-middleware');
import { createConfigs } from "./config";

function serve(dir: string) {
    
    const config = createConfigs(dir)
    const compiler = webpack(config);
    const app = express();

    app.use(devMiddleware(compiler, { serverSideRender: true }));
    
    app.use(hotMiddleware(compiler.compilers.find(_=>_.name === "client")));

    app.use(hotServerMiddleware(compiler, { chunkName: 'server' }));

    app.listen(3000, () => console.log('Example app listening on port 3000!'));    
}

program.command("serve <dir>").action(serve)

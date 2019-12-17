import program from "commander";
import express from "express";
import webpack from "webpack";
import { createConfigs } from "./config";
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const hotServerMiddleware = require("webpack-hot-server-middleware");

function serve(dir: string) {
  const config = createConfigs(dir);
  const compiler = webpack(config);
  const app = express();

  app.use(devMiddleware(compiler, { serverSideRender: true }));

  app.use(hotMiddleware(compiler.compilers.find(_ => _.name === "client")));

  app.use(hotServerMiddleware(compiler, { chunkName: "server" }));

  // tslint:disable-next-line: no-console
  app.listen(3000, () => console.log("Listening on port 3000!"));
}

program.command("serve <dir>").action(serve);

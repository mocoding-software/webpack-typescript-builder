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
  const port = process.env.PORT || 3000;
  process.stdout.write("Starting the development server.\n");

  app.use(devMiddleware(compiler, { serverSideRender: true }));

  app.use(hotMiddleware(compiler.compilers.find(_ => _.name === "client")));

  app.use(hotServerMiddleware(compiler, { chunkName: "server" }));

  app.listen(port, () => process.stdout.write(`Listening on port ${port}\n`));
}

program.command("serve <dir>").action(serve);

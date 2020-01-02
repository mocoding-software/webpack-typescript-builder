import program from "commander";
import express from "express";
import webpack from "webpack";
import { createConfigs } from "./config";
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const hotServerMiddleware = require("webpack-hot-server-middleware");
import { printResults } from "../printResults";

function serve(dir: string) {
  const config = createConfigs(dir);
  const compiler = webpack(config);
  const app = express();
  const port = process.env.PORT || 3000;
  process.stdout.write("Starting the development server.\n");

  const devMiddlewareInstance = devMiddleware(compiler, {
    serverSideRender: true,
    stats: true,
    writeToDisk: true,
  });

  app.use(devMiddlewareInstance);

  app.use(hotMiddleware(compiler.compilers.find(_ => _.name === "client")));

  app.use(hotServerMiddleware(compiler, { chunkName: "server" }));

  app.listen(port, () =>
    devMiddlewareInstance.waitUntilValid(() => {
      process.stdout.write(`Listening on port ${port}\n`);
    }),
  );
}

program.command("serve <dir>").action(serve);

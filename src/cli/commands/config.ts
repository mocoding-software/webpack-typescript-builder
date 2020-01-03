import program from "commander";
import * as fs from "fs";
import * as path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import { createServerConfig, createWebConfig } from "../../config-builder";
import { Settings } from "../settings";

export function createConfigs(dir: string): webpack.Configuration[] {
  // Defaults:
  // projectRoot - root of the project (project.json location)
  // libRoot - root location of this lib (node_modules/webpack-typescript-builder)
  // libAppRoot - root location of the entrypoint app (node_modules/webpack-typescript-builder/app)
  // appRoot - root of the app (exmaple: project/client-app)
  // settingsFileName - name of settings file for webpack-typescript-builder

  const projectRoot = process.cwd();
  const libRoot = path.join(__dirname, "../../..");
  const libAppRoot = path.join(libRoot, "app");
  const appRoot = path.join(projectRoot, dir);
  const settingsFileName = "wtb.json";

  const defaultSettingsLocation = path.join(libAppRoot, settingsFileName);
  const customSettingsLocation = path.join(appRoot, settingsFileName);

  // Find tsconfig.json to be used.
  const defaultTsConfigLocation = path.join(libRoot, "tsconfig.base.json");
  const appTsConfigLocation = path.join(projectRoot, "tsconfig.json");
  const tsConfigLocation = fs.existsSync(appTsConfigLocation)
    ? appTsConfigLocation
    : defaultTsConfigLocation;

  // load wtb.json if present to override default settings
  const defaultSettings = JSON.parse(
    fs.readFileSync(defaultSettingsLocation, "utf8"),
  );
  const settings: Settings = fs.existsSync(customSettingsLocation)
    ? {
        ...defaultSettings,
        ...JSON.parse(fs.readFileSync(customSettingsLocation, "utf8")),
      }
    : defaultSettings;

  // outputPath - build directory
  // outputPathServer - build directory
  // clientEntryPoint - entry point for client (browser) side
  // serverEntryPoint - entry point for server side (development only).
  // ssrEntryPoint - entry point for render function.

  const outputPath = path.join(projectRoot, settings.outputClientPath);
  const outputPathServer = path.join(projectRoot, settings.outputServerPath);
  const clientEntryPoint = path.join(libAppRoot, "client");
  const serverEntryPoint = path.join(libAppRoot, "server");
  const ssrEntryPoint = settings.ssrModule
    ? path.join(appRoot, settings.ssrModule)
    : path.join(libAppRoot, "ssr");

  const appEntry = path.join(
    libAppRoot,
    `entry/index.${program.production ? "prod" : "dev"}.ts`,
  );

  const devEntries = program.production
    ? []
    : ["webpack-hot-middleware/client", "react-hot-loader/patch"];

  const client: webpack.Entry = {
    index: [...devEntries, clientEntryPoint],
  };

  const server: webpack.Entry = {
    server: program.production ? ssrEntryPoint : serverEntryPoint,
  };

  process.stdout.write(`Using ${tsConfigLocation}\n`);

  let clientConfig = createWebConfig(
    tsConfigLocation,
    client,
    outputPath,
    program.production,
  );

  let serverConfig = createServerConfig(
    tsConfigLocation,
    server,
    outputPathServer,
    program.production,
  );

  const definePlugin = new webpack.DefinePlugin({
    "process.env": {
      API_URL: JSON.stringify(settings.devApiUrl),
      NODE_ENV: JSON.stringify(
        program.production ? "production" : "development",
      ),
    },
  });

  clientConfig.plugins.push(definePlugin);
  serverConfig.plugins.push(definePlugin);

  if (!program.production) {
    clientConfig.resolve.alias["react-dom"] = "@hot-loader/react-dom";
    serverConfig.resolve.alias["react-dom"] = "@hot-loader/react-dom";
  }

  // Extend configs.
  if (settings.extend) {
    if (settings.extend.clientConfig) {
      const location = path.join(appRoot, settings.extend.clientConfig);
      const extendClientConfig = require(location) as webpack.Configuration;
      clientConfig = merge.smart(clientConfig, extendClientConfig);
    }
    if (settings.extend.serverConfig) {
      const location = path.join(appRoot, settings.extend.serverConfig);
      const extendServerConfig = require(location) as webpack.Configuration;
      serverConfig = merge.smart(serverConfig, extendServerConfig);
    }
  }

  const configs = [clientConfig, serverConfig];

  // inject flavors
  const reduxAsyncModule = "./flavors/router-redux-async";
  const reduxModule = "./flavors/router-redux";
  const basicModule = "./flavors/basic";

  let flavorModule: string;

  switch (settings.flavor) {
    case "router-redux":
      flavorModule = reduxModule;
      break;
    case "router-redux-async":
      flavorModule = reduxAsyncModule;
      break;
    default:
      flavorModule = basicModule;
      break;
  }

  inject(configs, "injected-app-entry", appEntry);
  inject(configs, "injected-app-module", appRoot);
  inject(configs, "injected-flavor-module", flavorModule);
  inject(configs, "injected-ssr-module", ssrEntryPoint);

  return configs;
}

function inject(
  configs: webpack.Configuration[],
  module: string,
  alias: string,
) {
  for (const item of configs) {
    item.resolve.alias[module] = alias;
  }
}

function config(dir: string) {
  const cfg = createConfigs(dir);
  // tslint:disable-next-line: no-console
  console.log(cfg);
}

program.command("config <dir>").action(config);

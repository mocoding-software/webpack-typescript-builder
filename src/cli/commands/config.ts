import program from "commander";
import * as fs from "fs";
import * as path from "path";
import webpack from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
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

  const defaultTsConfigLocation = path.join(libRoot, "tsconfig.base.json");
  const appTsConfigLocation = path.join(projectRoot, "tsconfig.json");
  const tsConfigLocation = fs.existsSync(appTsConfigLocation)
    ? appTsConfigLocation
    : defaultTsConfigLocation;

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

  const outputPath = path.join(projectRoot, settings.outputClientPath);
  const outputPathServer = path.join(projectRoot, settings.outputServerPath);
  const clientEntryPoint = path.join(libAppRoot, "client");
  const serverEntryPoint = path.join(libAppRoot, "server");
  const ssrEntryPoint = path.join(libAppRoot, "ssr");
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

  const clientConfig = createWebConfig(
    tsConfigLocation,
    client,
    outputPath,
    program.production,
  );
  const serverConfig = createServerConfig(
    tsConfigLocation,
    server,
    outputPathServer,
    program.production,
  );

  clientConfig.plugins.push(
    new ManifestPlugin({
      fileName: path.join(outputPathServer, "manifest.json"),
      filter: _ => _.isChunk,
    }),
  );

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

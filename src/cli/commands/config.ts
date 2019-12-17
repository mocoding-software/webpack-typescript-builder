import program from "commander"
import webpack, { Configuration } from "webpack";
import { createWebConfig, createServerConfig } from "../../config-builder"
import * as path from "path";
import * as fs from "fs";
import { Settings } from "../settings";
import ManifestPlugin from "webpack-manifest-plugin";


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

  const defaultSettings = JSON.parse(fs.readFileSync(defaultSettingsLocation, 'utf8'));
  const settings: Settings = fs.existsSync(customSettingsLocation)
    ? { ...defaultSettings, ...(JSON.parse(fs.readFileSync(customSettingsLocation, 'utf8'))) }
    : defaultSettings;

  // outputPath - build directory
  // outputPathServer - build directory

  const outputPath = path.join(projectRoot, settings.outputClientPath);
  const outputPathServer = path.join(projectRoot, settings.outputServerPath);
  const clientEntryPoint = path.join(libAppRoot, "client.tsx");
  const serverEntryPoint = path.join(libAppRoot, "server.ts");
  const ssrEntryPoint = path.join(libAppRoot, "ssr");

  const client: webpack.Entry = {
    index: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      clientEntryPoint
    ]
  };

  const server: webpack.Entry = {
    server: [serverEntryPoint],    
  };

  var clientConfig = createWebConfig(client, outputPath, false);
  var serverConfig = createServerConfig(server, outputPathServer, false);
  
  clientConfig.plugins.push(new ManifestPlugin({
    fileName: path.join(outputPathServer, "manifest.json"),
    filter: _ => _.isChunk
  }));

  var configs = [clientConfig, serverConfig];

  const helmetWrapper = "./wrapper-helmet"
  const reduxWrapper = "./wrapper-redux"
  const noopWrapper = "./wrapper-noop"

  inject(configs, "injected-app-module", appRoot);  
  inject(configs, "injected-redux-wrapper", settings.enableRedux ? reduxWrapper : noopWrapper);

  return configs;
}

function inject(configs: webpack.Configuration[], module: string, alias: string) {
  for (const config of configs) {
    config.resolve.alias[module] = alias;
  }
}

function config(dir: string) {
  const config = createConfigs(dir);
  console.log(config)
}

program.command("config <dir>").action(config)



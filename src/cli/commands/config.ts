import program from "commander"
import webpack from "webpack";
import { createWebConfig, createServerConfig } from "../../config-builder"
import * as path from "path";

export function createConfigs(dir: string): webpack.Configuration [] {
    const cwd = process.cwd();   

    // set default paths
    const outputPath = path.join(cwd, dir, "wwwroot");
    const outputPathServer = path.join(cwd, dir, "wwwroot_node");
    const appPath = path.join(cwd, dir);
    const clientEntryPoint = path.join(__dirname, "../../bootstrap/client.tsx");
    const serverEntryPoint = path.join(__dirname, "../../bootstrap/server.tsx");

    const client: webpack.Entry = {
        index: [
          'webpack-hot-middleware/client',
          'react-hot-loader/patch',
          clientEntryPoint
        ]
    };

    const server: webpack.Entry = {
      server: [ serverEntryPoint ]
  };

    var clientConfig = createWebConfig(client, outputPath, false);
    clientConfig.resolve.alias = {
        "injected-app-module": appPath,
    };

    var serverConfig = createServerConfig(server, outputPathServer, false);
    serverConfig.resolve.alias = {
        "injected-app-module": appPath,
    };
    
    return [clientConfig, serverConfig];
}

function config(dir: string){
    const config = createConfigs(dir);
    console.log(config)
}

program.command("config <dir>").action(config)



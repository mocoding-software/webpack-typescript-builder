import program from "commander"
import webpack from "webpack";
import { createUmdConfig } from "../../config-builder"
import * as path from "path";

export function createConfig(dir: string): webpack.Configuration {
    const cwd = process.cwd();   

    // set default paths
    const outputPath = path.join(cwd, dir, "wwwroot");
    const appPath = path.join(cwd, dir, "index");
    const bootstrapPath = path.join(__dirname, "../../bootstrap/client.tsx");

    const entry: webpack.Entry = {
        index: [
          'webpack-hot-middleware/client',
          'react-hot-loader/patch',
          bootstrapPath
        ]
    };

    const config = createUmdConfig(entry, outputPath, false);
    config.resolve.alias = {
        "injected-app-module": appPath,
    };
    
    return config;
}

function config(dir: string){
    const config = createConfig(dir);
    console.log(config)
}

program.command("config <dir>").action(config)



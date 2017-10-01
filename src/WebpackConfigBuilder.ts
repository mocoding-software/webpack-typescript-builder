import * as webpack from "webpack";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { getDefaultResolveSection } from "./common";
import { defaultPlugins } from "./plugins";
import { asUmdLib, asServerLib } from "./outputs";
import { defaultClientRules, defaultServerRules, sassGlob } from "./rules";

export class WebpackConfigBuilder {
    defaultEntryName: string;    
    constructor(private entry: webpack.Entry) {

        const entryKeys = Object.getOwnPropertyNames(entry);
        if (entryKeys.length === 0)
            throw new Error("Entry should contain at least one key-value pair.")

        this.defaultEntryName = entryKeys[0];        
    }

    toUmdConfig(outputPath: string, ...plugins: webpack.Plugin[]): webpack.Configuration {
        return {
            stats: { modules: false },
            entry: this.entry,
            resolve: getDefaultResolveSection(),
            output: asUmdLib(outputPath),
            module: {                
                rules: [...defaultClientRules]
            },
            plugins: [...defaultPlugins, ...plugins, new ExtractTextPlugin(this.defaultEntryName + ".css")]
        }
    }

    toServerConfig(outputPath: string, ...plugins: webpack.Plugin[]): webpack.Configuration {
        return {
            stats: { modules: false },
            entry: this.entry,
            resolve: getDefaultResolveSection(),
            output: asServerLib(outputPath),
            target: "node",
            devtool: 'source-map',
            module: {                
                rules: [...defaultServerRules]
            },
            plugins: [...defaultPlugins, ...plugins]
        }
    }
}
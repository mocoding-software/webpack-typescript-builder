import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as webpack from "webpack";
import { getDefaultResolveSection } from "./common";
import { asServerLib, asUmdLib } from "./outputs";
import { defaultPlugins } from "./plugins";
import { defaultClientRules, defaultServerRules, sassGlob } from "./rules";

const isProduction = (process.argv.indexOf("-p") !== -1);

export class WebpackConfigBuilder {
    public defaultEntryName: string;
    constructor(private entry: webpack.Entry) {

        const entryKeys = Object.getOwnPropertyNames(entry);
        if (entryKeys.length === 0) {
            throw new Error("Entry should contain at least one key-value pair.");
        }

        this.defaultEntryName = entryKeys[0];
    }

    public toUmdConfig(outputPath: string, ...plugins: webpack.Plugin[]): webpack.Configuration {
        return {
            mode: isProduction ? "production" : "development",
            stats: { modules: false },
            entry: this.entry,
            resolve: getDefaultResolveSection(),
            output: asUmdLib(outputPath),
            module: {
                rules: [...defaultClientRules],
            },
            plugins: [...defaultPlugins, ...plugins, new ExtractTextPlugin(this.defaultEntryName + ".css") as any],
        };
    }

    public toServerConfig(outputPath: string, ...plugins: webpack.Plugin[]): webpack.Configuration {
        return {
            mode: isProduction ? "production" : "development",
            stats: { modules: false },
            entry: this.entry,
            resolve: getDefaultResolveSection(),
            output: asServerLib(outputPath),
            target: "node",
            devtool: "source-map",
            module: {
                rules: [...defaultServerRules],
            },
            plugins: [...defaultPlugins, ...plugins],
        };
    }
}

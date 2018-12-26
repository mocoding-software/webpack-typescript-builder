import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as webpack from "webpack";
import { getDefaultResolveSection } from "./common";
import { asServerLib, asUmdLib } from "./outputs";
import { defaultPlugins } from "./plugins";
import { getDefaultClientRules, getDefaultServerRules, sassGlob } from "./rules";

const isProduction = (process.argv.indexOf("-p") !== -1);

export class WebpackConfigBuilder {
    public defaultEntryName: string;
    constructor(private entry: webpack.Entry, private parallelBuild: boolean = true) {

        const entryKeys = Object.getOwnPropertyNames(entry);
        if (entryKeys.length === 0) {
            throw new Error("Entry should contain at least one key-value pair.");
        }

        this.defaultEntryName = entryKeys[0];
    }

    public toUmdConfig(outputPath: string, ...plugins: webpack.Plugin[]): webpack.Configuration {
        const defaultPluginsList = this.parallelBuild ? defaultPlugins() : [];
        return {
            devtool: isProduction ? undefined : "source-map",
            entry: this.entry,
            mode: isProduction ? "production" : "development",
            module: { rules: getDefaultClientRules(this.parallelBuild) },
            output: asUmdLib(outputPath),
            plugins: [...defaultPluginsList, ...plugins, new ExtractTextPlugin(this.defaultEntryName + ".css") as any],
            resolve: getDefaultResolveSection(),
            stats: { modules: false },
        };
    }

    public toServerConfig(outputPath: string, ...plugins: webpack.Plugin[]): webpack.Configuration {
        const defaultPluginsList = this.parallelBuild ? defaultPlugins() : [];
        return {
            devtool: "source-map",
            entry: this.entry,
            mode: isProduction ? "production" : "development",
            module: { rules: getDefaultServerRules(this.parallelBuild) },
            output: asServerLib(outputPath),
            plugins: [...defaultPluginsList, ...plugins],
            resolve: getDefaultResolveSection(),
            stats: { modules: false },
            target: "node",
        };
    }
}

import * as webpack from "webpack";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { getDefaultResolveSection } from "./common";
import { defaultPlugins } from "./plugins";
import { asUmdLib, asServerLib } from "./outputs";
import { defaultClientRules, defaultServerRules } from "./rules";

export class WebpackConfigBuilder {
    private _config: webpack.Configuration;
    constructor(entry: webpack.Entry) {

        const entryKeys = Object.getOwnPropertyNames(entry);
        if (entryKeys.length === 0)
            throw new Error("Entry should contain at least one key-value pair.")
        
        var firstName = entryKeys[0];

        this._config = {
            stats: { modules: false },
            entry,
            resolve: getDefaultResolveSection(),
            plugins: [...defaultPlugins, new ExtractTextPlugin(firstName + ".css")]
        }

    }

    toUmdConfig(outputPath: string): webpack.Configuration {
        var config = this.deepClone(this._config);
        return {
            ...config,
            output: asUmdLib(outputPath),
            module: {
                loaders: [...defaultClientRules]
            },
        }
    }

    toServerConfig(outputPath: string): webpack.Configuration {
        var config = this.deepClone(this._config);
        return {
            ...config,
            output: asServerLib(outputPath),
            target: "node",
            devtool: 'inline-source-map',
            module: {
                loaders: [...defaultServerRules]
            },
        }
    }

    deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }
}
import * as webpack from "webpack";
import { serverRules } from "./rules";
import plugins from "./plugins";

export function createServerConfig(
  entry: webpack.Entry,
  outputPath: string,
  isProduction: boolean
): webpack.Configuration {
  var newPlugins = [...plugins, new webpack.NoEmitOnErrorsPlugin()];
  return {
    name: "server",
    devtool: "source-map",
    entry,
    mode: isProduction ? "production" : "development",
    module: { rules: serverRules },
    output: {
      filename: "[name].js",      
      libraryTarget: "commonjs2",
      path: outputPath,
      publicPath: "/"
    },
    plugins: newPlugins,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    stats: true,
    target: "node",
  };
}

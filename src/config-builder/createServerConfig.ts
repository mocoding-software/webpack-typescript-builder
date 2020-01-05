import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import * as webpack from "webpack";
import { serverRules } from "./rules";

export function createServerConfig(
  tsConfigLocation: string,
  entry: webpack.Entry,
  outputPath: string,
  isProduction: boolean,
): webpack.Configuration {
  return {
    devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
    entry,
    mode: isProduction ? "production" : "development",
    module: { rules: serverRules },
    name: "server",
    optimization: {
      minimize: false,
      namedChunks: true,
      namedModules: true,
    },
    output: {
      filename: "[name].js",
      libraryTarget: "commonjs2",
      path: outputPath,
      pathinfo: false,
      publicPath: "/",
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        tsconfig: tsConfigLocation,
        tslint: true,
      }),
    ],
    resolve: {
      alias: {},
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [new TsconfigPathsPlugin({ configFile: tsConfigLocation })],
    },
    stats: false,
    target: "node",
  };
}

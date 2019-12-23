import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as webpack from "webpack";
import { clientRules } from "./rules";
import { Without } from "./without";

export function createWebConfig(
  entry: webpack.Entry,
  outputPath: string,
  isProd: boolean,
): webpack.Configuration {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: isProd ? "[name].[contenthash:6].css" : "[name].css",
    }),
    new Without([/styles\.[0-9a-z]+\.js/]),
  ];

  if (!isProd) {
    plugins.push(new webpack.HotModuleReplacementPlugin({ quiet: true }));
  }

  return {
    devtool: isProd ? undefined : "source-map",
    entry,
    mode: isProd ? "production" : "development",
    module: { rules: clientRules(isProd) },
    name: "client",
    optimization: {
      noEmitOnErrors: true,
      splitChunks: {
        cacheGroups: {
          styles: {
            chunks: "all",
            enforce: true,
            name: "styles",
            test: /\.css$/,
          },
          vendors: {
            chunks: "all",
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
    output: {
      filename: isProd ? "[name].[contenthash:6].js" : "[name].js",
      library: "[name]",
      libraryTarget: "umd",
      path: outputPath,
      publicPath: "/",
    },
    plugins,
    resolve: {
      alias: {},
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    stats: true,
  };
}

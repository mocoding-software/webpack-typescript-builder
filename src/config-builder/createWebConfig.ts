import * as webpack from "webpack";
import { clientRules } from "./rules";
import plugins from "./plugins";

export function createWebConfig(
  entry: webpack.Entry,
  outputPath: string,
  isProduction: boolean
): webpack.Configuration {
  var newPlugins = [
    ...plugins,
    new webpack.HotModuleReplacementPlugin({ quiet: true }),
    new webpack.NoEmitOnErrorsPlugin(),    
  ];
  return {
    name: "client",
    devtool: isProduction ? undefined : "source-map",
    entry,
    mode: isProduction ? "production" : "development",
    module: { rules: clientRules },
    output: {
      filename: "[name].js", //.[contenthash:8]
      library: "[name]",
      libraryTarget: "umd",
      path: outputPath,
      publicPath: "/"
    },
    plugins: newPlugins,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {}
    },
    stats: true,
    optimization: {
      minimize: isProduction,
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          },
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    }
  };
}

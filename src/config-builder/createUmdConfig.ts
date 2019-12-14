import * as webpack from "webpack";
import rules from "./rules"
import plugins from "./plugins"

export function createUmdConfig(entry: webpack.Entry, outputPath: string, isProduction: boolean): webpack.Configuration {
  var newPlugins = [...plugins, new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]
  return {
    devtool: isProduction ? undefined : "source-map",
    entry,
    mode: isProduction ? "production" : "development",
    module: { rules: rules },
    output: {
      filename: "[name].js", //.[contenthash:8]
      library: "[name]",
      libraryTarget: "umd",
      path: outputPath,
      publicPath: "/",
    },
    plugins: newPlugins,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    stats: true,
    optimization: {
      minimize: isProduction,
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        }
      }
    }
  };
}

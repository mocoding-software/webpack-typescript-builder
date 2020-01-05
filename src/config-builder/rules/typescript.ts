import * as webpack from "webpack";
const tsImportPluginFactory = require("ts-import-plugin");

export const typescript: webpack.Rule = {
  test: /\.(ts|tsx)?$/,
  use: {
    loader: "ts-loader",
    options: {
      allowTsInNodeModules: true,
      compilerOptions: {
        module: "es2015",
      },
      experimentalWatchApi: true,
      getCustomTransformers: () => ({
        before: [tsImportPluginFactory(/** options */)],
      }),
      onlyCompileBundledFiles: true,
      transpileOnly: true,
    },
  },
};

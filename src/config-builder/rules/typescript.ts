import * as webpack from "webpack";
export const typescript: webpack.Rule = {
  test: /\.(ts|tsx)?$/,
  use: {
    loader: "ts-loader",
    options: {
      allowTsInNodeModules: true,
      experimentalWatchApi: true,
      onlyCompileBundledFiles: true,
      transpileOnly: true,
    },
  },
};

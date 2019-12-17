import webpack from "webpack";
export const tslint: webpack.Rule = {
  exclude: [/node_modules/],
  test: /\.(ts|tsx)?$/,
  use: "tslint-loader",
};

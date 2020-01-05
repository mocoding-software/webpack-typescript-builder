import webpack from "webpack";
export const tslint: webpack.Rule = {
  test: /\.(ts|tsx)?$/,
  use: "tslint-loader",
};

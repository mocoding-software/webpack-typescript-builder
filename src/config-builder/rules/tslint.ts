import webpack from "webpack";
export const tslint: webpack.Rule = {
  include: __dirname,
  test: /\.(ts|tsx)?$/,
  use: "tslint-loader",
};

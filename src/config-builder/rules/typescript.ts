import * as webpack from "webpack";
export const typescript: webpack.Rule = {
  include: __dirname,
  test: /\.(ts|tsx)?$/,
  use: { loader: "ts-loader" },
};

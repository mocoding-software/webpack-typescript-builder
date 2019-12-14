import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const cssExtractPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // all options are optional
  filename: "[name].css"
});

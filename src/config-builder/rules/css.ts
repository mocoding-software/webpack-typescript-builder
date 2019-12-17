import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const cssRegex = /\.css$/i;

export const css: webpack.Rule = {
  test: cssRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true //TODO: Production
      }
    },
    "css-loader"
  ]
};

export const noCss: webpack.Rule = {
  test: cssRegex,
  use: "ignore-loader"
}

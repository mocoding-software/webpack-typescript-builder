import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

const cssRegex = /\.css$/i;

export const css: (isProduction: boolean) => webpack.Rule = isProduction => ({
  test: cssRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isProduction,
      },
    },
    "css-loader",
  ],
});

export const noCss: webpack.Rule = {
  test: cssRegex,
  use: "ignore-loader",
};

import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const sassRegex = /\.s[ac]ss$/i;

export const sass: webpack.Rule = {
  test: sassRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: true //TODO: Production
      }
    },
    "css-loader",
    "sass-loader"
  ]
};

export const sassGlob: webpack.Rule = {
  enforce: "pre",
  test: sassRegex,
  use: "import-glob"
};

export const noSass: webpack.Rule = {
  test: sassRegex,
  use: "ignore-loader"
}

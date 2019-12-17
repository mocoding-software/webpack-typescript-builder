import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

const sassRegex = /\.s[ac]ss$/i;

export const sass: (isProduction: boolean) => webpack.Rule = isProduction => ({
  test: sassRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isProduction,
      },
    },
    "css-loader",
    "sass-loader",
  ],
});

export const sassGlob: webpack.Rule = {
  enforce: "pre",
  test: sassRegex,
  use: "import-glob",
};

export const noSass: webpack.Rule = {
  test: sassRegex,
  use: "ignore-loader",
};

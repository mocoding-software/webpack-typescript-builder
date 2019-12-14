import webpack from "webpack";

export const fonts: webpack.Rule = {
  test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
  use: {
    loader: "file-loader",
    options: {
      emitFile: false, //TODO: Production
      limit: 4096,
      name: "fonts/[name].[contenthash:6].[ext]"
    }
  }
};

import webpack from "webpack";

export const images: webpack.Rule = {
  test: /\.(png|jpg|gif)$/,
  use: {
    loader: "url-loader",
    options: {
      emitFile: true, //TODO: Production
      limit: 4096,
      name: "img/[name].[contenthash:6].[ext]"
    }
  }
};

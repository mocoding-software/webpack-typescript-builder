import * as webpack from "webpack";

export const javascript: webpack.Rule = {
  test: /\.m?js$/,
  use: [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ],
};

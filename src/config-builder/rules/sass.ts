import webpack from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const sass: webpack.Rule = {
  test: /\.s[ac]ss$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {        
        hmr: true, //TODO: Production
      },
    },    
    'css-loader',    
    'sass-loader',
  ],
};

export const sassGlob: webpack.Rule = {
  enforce: "pre",
  test: /\.scss$/,
  use: "import-glob",
};

import webpack from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const sass: webpack.Rule = {
  test: /\.s[ac]ss$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {        
        hmr: true,
      },
    },    
    'css-loader',    
    'sass-loader',
  ],
};

import webpack from "webpack";

function createFontsRule(emitFile: boolean = true): webpack.Rule {
  return {
    test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
    use: {
      loader: "file-loader",
      options: {
        emitFile,
        limit: 4096,
        name: "fonts/[name].[contenthash:6].[ext]"
      }
    }
  };
}

export const fonts = createFontsRule();
export const noFonts = createFontsRule(false);

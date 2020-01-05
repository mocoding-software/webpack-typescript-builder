import webpack from "webpack";

function createFaviconRule(emitFile: boolean = true): webpack.Rule {
  return {
    test: /favicon.ico$/,
    use: {
      loader: "file-loader",
      options: {
        emitFile,
        name: "favicon.ico",
      },
    },
  };
}

export const favicon = createFaviconRule();
export const noFavicon = createFaviconRule(false);

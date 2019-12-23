// https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151

import * as webpack from "webpack";

export class Without {
  constructor(private patterns: RegExp[]) {}

  public apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tapAsync(
      "MiniCssExtractPluginCleanup",
      (compilation, callback) => {
        Object.keys(compilation.assets)
          .filter(asset => {
            let match = false;
            let i = this.patterns.length;
            while (i--) {
              if (this.patterns[i].test(asset)) {
                match = true;
              }
            }
            return match;
          })
          .forEach(asset => {
            delete compilation.assets[asset];
          });

        callback();
      },
    );
  }
}

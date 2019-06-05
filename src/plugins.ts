import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

export const defaultPlugins: () => webpack.Plugin[] = () => [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
        },
    }),
];

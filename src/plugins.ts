import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

export const defaultPlugins: webpack.Plugin[] = [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
];

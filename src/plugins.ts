import * as path from "path";
import * as webpack from "webpack";
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HappyPack = require("happypack");

export const defaultPlugins: webpack.Plugin[] = [
    new HappyPack({
        id: "ts",
        threads: 4,
        loaders: [
            {
                path: "ts-loader",
                query: { happyPackMode: true },
            },
        ],
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
];

import * as webpack from 'webpack';
import * as path from "path";
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var HappyPack = require('happypack');

export const defaultPlugins: webpack.Plugin[] = [    
    new HappyPack({
        id: 'ts',
        threads: 2,
        loaders: [
            {
                path: 'ts-loader',
                query: { happyPackMode: true }
            }
        ]
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
]
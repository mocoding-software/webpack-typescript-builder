import * as webpack from 'webpack';
import * as path from "path";

import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';

export const defaultPlugins: webpack.Plugin[] = [    
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),    
]
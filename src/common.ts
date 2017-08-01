import * as webpack from 'webpack';

export const getDefaultResolveSection: () => webpack.Resolve = () => ({
    extensions:  [".js", ".jsx", ".ts", ".tsx"]    
});
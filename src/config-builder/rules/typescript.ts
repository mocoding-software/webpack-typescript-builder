import * as webpack from "webpack";
export const typescript: webpack.Rule = {
    exclude: [/node_modules/],
    test: /\.(ts|tsx)?$/,
    use: { loader: "ts-loader" },
};
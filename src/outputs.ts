import * as webpack from "webpack";

function asUmdLib(path: string): webpack.Output {
    return {
        filename: "[name].js",
        library: "[name]",
        libraryTarget: "umd",
        path,
        publicPath: "/",
    };
}

function asServerLib(path: string): webpack.Output {
    return {
        filename: "[name].js",
        libraryTarget: "commonjs2",
        path,
        publicPath: "/",
    };
}

export {
    asUmdLib,
    asServerLib,
};

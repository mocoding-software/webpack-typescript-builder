import * as webpack from "webpack";

function asUmdLib(path: string): webpack.Output {
    return {
        path,
        filename: "[name].js",   
        library: "[name]",      
        libraryTarget: "umd",  
        publicPath: "/"
    }
}

function asServerLib(path: string): webpack.Output {
    return {
        path,
        filename: "[name].js",        
        libraryTarget: "commonjs2",
        publicPath: "/"
    }
}

export {
    asUmdLib,
    asServerLib,
}
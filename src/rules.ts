import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as os from "os";
import * as webpack from "webpack";

const parallelTypescript: webpack.Rule = {
    exclude: [/node_modules/],
    test: /\.(ts|tsx)?$/,
    use: [
        { loader: "cache-loader" },
        {
            loader: "thread-loader",
            options: {
                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                workers: os.cpus().length - 1,
            },
        },
        {
            loader: "ts-loader",
            options: {
                happyPackMode: true,
            },
        },
    ],
};

const typescript: webpack.Rule = {
    exclude: [/node_modules/],
    test: /\.(ts|tsx)?$/,
    use: { loader: "ts-loader" },
};

const tslint: webpack.Rule = {
    exclude: [/node_modules/],
    test: /\.(ts|tsx)?$/,
    use: "tslint-loader",
};

const sassStyles: webpack.Rule = {
    test: /\.scss$/,
    use: [
        "css-hot-loader",
        ...ExtractTextPlugin.extract({
            use: [
                "css-loader",
                "sass-loader",
            ],
        })],
};

const sassGlob: webpack.Rule = {
    enforce: "pre",
    test: /\.scss$/,
    use: "import-glob",
};

const styles: webpack.Rule = {
    test: /\.css$/,
    use: [
        "css-hot-loader",
        ...ExtractTextPlugin.extract({
            use: [
                "css-loader",
            ],
        })],
};

function images(emitFile: boolean = true): webpack.Rule {
    return {
        test: /\.(png|jpg|gif)$/,
        use: {
            loader: "url-loader",
            options: {
                emitFile,
                limit: 4096,
                name: "img/[name].[hash].[ext]",
            },
        },
    };
}

function fonts(emitFile: boolean = true): webpack.Rule {
    return {
        test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
        use: {
            loader: "url-loader",
            options: {
                emitFile,
                limit: 4096,
                name: "fonts/[name].[hash].[ext]",
            },
        },
    };
}

const imagesNoEmit: webpack.Rule = images(false);
const fontsNoEmit: webpack.Rule = fonts(false);
const ignoreSassStyles: webpack.Rule = { ...sassStyles, use: "ignore-loader" };
const ignoreStyles: webpack.Rule = { ...styles, use: "ignore-loader" };

function getDefaultClientRules(enableParallelBuild: boolean): webpack.Rule[] {
    return [
        enableParallelBuild ? parallelTypescript : typescript,
        tslint, images(), fonts(), styles, sassStyles, sassGlob,
    ];
}

function getDefaultServerRules(enableParallelBuild: boolean): webpack.Rule[] {
    return [
        enableParallelBuild ? parallelTypescript : typescript,
        tslint, fontsNoEmit, imagesNoEmit, ignoreStyles, ignoreSassStyles,
    ];
}

export {
    typescript,
    parallelTypescript,
    tslint,
    sassStyles,
    sassGlob,
    styles,
    images,
    fonts,
    ignoreSassStyles,
    ignoreStyles,
    imagesNoEmit,
    fontsNoEmit,
    getDefaultClientRules,
    getDefaultServerRules,
};

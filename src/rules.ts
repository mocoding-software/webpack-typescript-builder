import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as os from "os";
import * as webpack from "webpack";

const typescript: webpack.Rule = {
    test: /\.(ts|tsx)?$/,
    use: "happypack/loader?id=ts",
    exclude: [/node_modules/],
};

const tslint: webpack.Rule = {
    test: /\.(ts|tsx)?$/,
    use: "tslint-loader",
    exclude: [/node_modules/],
};

const sassStyles: webpack.Rule = {
    test: /\.scss$/,
    use: [
        "css-hot-loader",
        ...ExtractTextPlugin.extract({
            use: [
                "css-loader?minimize",
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
                "css-loader?minimize",
            ],
        })],
};

function images(emitFile: boolean = true): webpack.Rule {
    return {
        test: /\.(png|jpg|gif)$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 4096,
                name: "img/[name].[hash].[ext]",
                emitFile,
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
                limit: 4096,
                name: "fonts/[name].[hash].[ext]",
                emitFile,
            },
        },
    };
}

const imagesNoEmit: webpack.Rule = images(false);
const fontsNoEmit: webpack.Rule = fonts(false);
const ignoreSassStyles: webpack.Rule = { ...sassStyles, use: "ignore-loader" };
const ignoreStyles: webpack.Rule = { ...styles, use: "ignore-loader" };

const defaultClientRules = [
    typescript, tslint, images(), fonts(), styles, sassStyles, sassGlob,
];

const defaultServerRules = [
    typescript, tslint, fontsNoEmit, imagesNoEmit, ignoreStyles, ignoreSassStyles,
];

export {
    typescript,
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
    defaultClientRules,
    defaultServerRules,
};

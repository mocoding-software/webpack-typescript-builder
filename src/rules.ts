import * as webpack from "webpack";
import ExtractTextPlugin = require("extract-text-webpack-plugin");

const typescript: webpack.Rule = {
    test: /\.(ts|tsx)?$/,
    use: "awesome-typescript-loader?silent=true",
    exclude: [/node_modules/]
}

const cssHotReloadLoader: webpack.NewLoader = {
    loader: 'css-hot-loader'
};

const extractSassLoaders: webpack.NewLoader[] = ExtractTextPlugin.extract({
    use: [{
        loader: "css-loader?minimize"
    }, {
        loader: "sass-loader"
    }],
    // use style-loader in development
    fallback: "style-loader"
}) as webpack.NewLoader[];

const sassStyles: webpack.Rule = {
    test: /\.scss$/,
    use: [cssHotReloadLoader].concat(extractSassLoaders)        
}

const extractCssLoaders: webpack.NewLoader[] = ExtractTextPlugin.extract({
    use: "css-loader?minimize",
    // use style-loader in development
    fallback: "style-loader"
}) as webpack.NewLoader[];

const styles: webpack.Rule = {
    test: /\.css$/,
    use: [cssHotReloadLoader].concat(extractCssLoaders)        
}

function images(emitFile: boolean = true): webpack.Rule {
    return {
        test: /\.(png|jpg|gif)$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 4096,
                name: "img/[name].[hash].[ext]",
                emitFile
            }
        }
    }
}

function fonts(emitFile: boolean = true): webpack.Rule {
    return {
        test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 4096,
                name: "fonts/[name].[hash].[ext]",
                emitFile
            }
        }
    }
}

const imagesNoEmit: webpack.Rule = images(false);
const fontsNoEmit: webpack.Rule = fonts(false);
const ignoreSassStyles: webpack.Rule = { ...sassStyles, use: "ignore-loader" };
const ignoreStyles: webpack.Rule = { ...styles, use: "ignore-loader" };

const defaultClientRules = [
    typescript, images(), fonts(), styles, sassStyles,
];

const defaultServerRules = [
    typescript, fontsNoEmit, imagesNoEmit, ignoreStyles, ignoreSassStyles
]

export {
    typescript,
    sassStyles,
    styles,
    images,
    fonts,
    ignoreSassStyles,
    ignoreStyles,
    imagesNoEmit,
    fontsNoEmit,
    defaultClientRules,
    defaultServerRules
}
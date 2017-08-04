import * as webpack from 'webpack';
import ExtractTextPlugin = require("extract-text-webpack-plugin");

const typescript: webpack.Rule = {
    test: /\.(ts|tsx)?$/,
    use: "awesome-typescript-loader?silent=true",
    exclude: [/node_modules/]
}

const sassStyles: webpack.Rule = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        use: [{
            loader: 'css-loader?minimize'
        }, {
            loader: "sass-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
    })
}

const styles: webpack.Rule = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: 'css-loader?minimize',        
        // use style-loader in development
        fallback: "style-loader"
    })
}

const images: webpack.Rule = {
    test: /\.(png|jpg|gif)$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 4096,
            name: "img/[name].[hash].[ext]"
        }
    }
}

const fonts: webpack.Rule = {
    test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 4096,
            name: "fonts/[name].[hash].[ext]"
        }
    }
}

const ignoreImages: webpack.Rule = { ...images, use: "ignore-loader" };
const ignoreFonts: webpack.Rule = { ...fonts, use: "ignore-loader" };
const ignoreSassStyles: webpack.Rule = { ...sassStyles, use: "ignore-loader" };
const ignoreStyles: webpack.Rule = { ...styles, use: "ignore-loader" };

const defaultClientRules = [
    typescript, images, fonts, styles, sassStyles,
];

const defaultServerRules = [
    typescript, ignoreFonts, ignoreImages, ignoreStyles, ignoreSassStyles
]

export {
    typescript,
    sassStyles,
    styles,
    images,
    fonts,
    ignoreSassStyles,
    ignoreStyles,
    ignoreImages,
    ignoreFonts,
    defaultClientRules,
    defaultServerRules
}
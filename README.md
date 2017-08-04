# webpack-typescript-builder
Webpack config builder with included rules for typescript, styles (css and sass), fonts and images.

## About
Following DRY principle.
Many webpack controlled web-projects use the same configuration for optimal deployment. This library is aimed to gather all configuration blocks in one place and don't repeat them from project to project.

## Installation  
The library is written in Typescript and compiled to ES6 JS. 

```bash
npm install webpack-typescript-builder --save-dev
```

This will install you the following library (no need to duplicate in your config)
- [Webpack](https://github.com/webpack/webpack)
- [Typescript](https://github.com/Microsoft/TypeScript)
- [Awesome TypeScript Loader](https://github.com/s-panferov/awesome-typescript-loader)
- [Style Loader](https://github.com/webpack/style-loader)    
- [CSS Loader](https://github.com/webpack/css-loader)
- [File Loader](https://github.com/webpack/file-loader)
- [URL Loader](https://github.com/webpack/url-loader)  
- [SASS Loader](https://github.com/webpack-contrib/sass-loader)
- [Node SASS](https://github.com/sass/node-sass)
- [Ignore Loader](https://github.com/cherrry/ignore-loader)
- [Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin)

## API
Library exposes single configuration builder as well as other building blocks to use in configuration.

### WebpackConfigBuilder

**Quick Start**
```js
import { WebpackConfigBuilder } from "webpack-typescript-builder";

const configBuilder = new WebpackConfigBuilder({
    bundle: ["./src/index"]
});

export default configBuilder.toUmdConfig("wwwroot");
```
This will generate webpack configuration that:
1. Adds awesome-typescript-loader and default resolve extensions '.js', '.jsx', '.ts', '.tsx'
2. Adds images, fonts, style (css and sass) rules
3. Adds CheckerPlugin and TsConfigPathsPlugin

The final `wwwroot` folder may look as following

```
/bundle.js
/bundle.css
/fonts/...
/images/...
```

The whole webpack configuration may look as following:
```js
{
    stats: {
        modules: false
    },
    entry: {
        bundle: ["./src/index"]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    output: {
        path: '<your root project>/wwwroot/',
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        publicPath: '/'
    },
    module: {
        loaders: [{
                test: /\.(ts|tsx)?$/,
                use: "awesome-typescript-loader?silent=true",
                exclude: [/node_modules/]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader?minimize'
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?minimize',
                    fallback: "style-loader"
                })
            }, {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        name: "img/[name].[hash].[ext]"
                    }
                }
            }, {
                test: /\.(eot|ttf|otf|woff|woff2|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        name: "fonts/[name].[hash].[ext]"
                    }
                }
            }
        ]
    },
    plugins: [        
        new CheckerPlugin(),
        new TsConfigPathsPlugin(),
        new ExtractTextPlugin("bundle.css")
    ]
}
```


#### WebpackConfigBuilder Methods

* ` toUmdConfig(outputPath: string, ...plugins: Plugin[]): Configuration`<br>
  Configures output as UMD module in `outputPath` folder.
* ` toServerConfig(outputPath: string, ...plugins: Plugin[]): Configuration`<br>
  Configures output as node (commonjs2) module in `outputPath` folder.

### DLL
To simplify producing and consuming of dll across configuring without copy paste.

**Produce DLL**
```js
import { Dll } from "webpack-typescript-builder";
export const vendorsDll = new Dll("vendors", "umd", "./.tmp");
...
/// Add vendorsDll.produce() to plugins array.
```
`produce` method will return DllPlugin

**Consume DLL**
```js
import { vendorsDll } from "./webpack.config.vendors";
...
/// Add vendorsDll.consume() to plugins array.
```
`consume` method will return DllReferncePlugin

### Rules
Rules could be imported as a collection or one by one:

#### Rules List

* typescript
* sassStyles
* styles
* images
* fonts
* ignoreSassStyles
* ignoreStyles
* ignoreImages
* ignoreFonts
* defaultClientRules
* defaultServerRules


### Other API
Library is very small. Take your time and explore `src` folder yourself.

## Known issues

You may need add sass-loader and node-sass to your project.

License
=======

[The MIT License](https://raw.githubusercontent.com/mocoding-software/webpack-typescript-builder/master/LICENSE)

Copyright (c) 2017 MOCODING, LLC

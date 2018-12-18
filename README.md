<div align="center">
  <a href="https://github.com/mocoding-software/webpack-typescript-builder">
    <img src="https://raw.githubusercontent.com/mocoding-software/webpack-typescript-builder/master/icon.png">
  </a>
  <br>
  <br>
</div>

[![npm][npm-image]][npm-url]
[![deps][deps]][deps-url]
# webpack-typescript-builder

Webpack config builder with included rules for typescript, styles (css and sass), fonts and images.

## About
Following DRY principle.
Many webpack controlled web-projects use the same configuration for optimal deployment. This library is aimed to gather all configuration blocks in one place and don't repeat them project to project.

## Installation  
The library is written in Typescript and compiled to ES6 JS. 

```bash
npm install webpack-typescript-builder --save-dev
```

This will install you the following libraries (no need to duplicate in your config)
- [Webpack](https://github.com/webpack/webpack)
- [Typescript](https://github.com/Microsoft/TypeScript)
- [TypeScript Loader](https://github.com/TypeStrong/ts-loader)
- [Style Loader](https://github.com/webpack/style-loader)    
- [CSS Loader](https://github.com/webpack/css-loader)
- [File Loader](https://github.com/webpack/file-loader)
- [URL Loader](https://github.com/webpack/url-loader)  
- [SASS Loader](https://github.com/webpack-contrib/sass-loader)
- [Node SASS](https://github.com/sass/node-sass)
- [Ignore Loader](https://github.com/cherrry/ignore-loader)
- [Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin)
- [Import Glob](https://github.com/terpiljenya/import-glob)
- [TSLint Loader](https://github.com/wbuchwalter/tslint-loader)
- [Fork TS Checker Webpack Plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin)
- [Cache Loader](https://github.com/webpack-contrib/cache-loader)
- [Thread Loader](https://github.com/webpack-contrib/thread-loader)

## API
Library exposes single configuration builder as well as other building blocks to use in configuration.

### WebpackConfigBuilder

**Usage**
```js
import { WebpackConfigBuilder } from "webpack-typescript-builder";

const configBuilder = new WebpackConfigBuilder({
    bundle: ["./src/index"]
});

export default configBuilder.toUmdConfig("wwwroot");
```
This will generate webpack configuration that:
1. Adds ts-loader and default resolve extensions '.js', '.jsx', '.ts', '.tsx'
2. Adds images, fonts, style (css and sass) rules
3. Adds Cache and Thread Loader for ts-loader. This option can be disabled if passing false as second argument to `WebpackConfigBuilder` constructor:

```js
const configBuilder = new WebpackConfigBuilder({
    bundle: ["./src/index"]
}, false); // this will disable parallel build which is enabled by default
```

The final `wwwroot` folder will look as following

```
/bundle.js
/bundle.css
/fonts/...
/images/...
```

The whole webpack configuration looks as following:
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
        rules: [{
                test: /\.(ts|tsx)?$/,
                use: 'tslint-loader',
                exclude: [/node_modules/]
            }, {
                enforce: "pre",
                test: /\.scss$/,
                use: "import-glob",  
            }, {
                test: /\.(ts|tsx)?$/,
                use: [ 
                    { loader: "cache-loader" }, 
                    { loader: "thread-loader", options: { workers: os.cpus().length - 1 } }, 
                    { loader: "ts-loader", options: { happyPackMode: true } },
                ],
                exclude: [/node_modules/]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader?minimize' }, 
                        { loader: "sass-loader" }
                    ],
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
        new ForkTsCheckerWebpackPlugin(),
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
* parallelTypescript
* tslint
* sassStyles
* globSass
* styles
* images
* fonts
* ignoreSassStyles
* ignoreStyles
* imagesNoEmit
* fontsNoEmit
* getDefaultClientRules
* getDefaultServerRules


### Other API
Library is very small. Take your time and explore `src` folder yourself.

## Known issues

You may need to add sass-loader and node-sass to your project.

License
=======

[The MIT License](https://raw.githubusercontent.com/mocoding-software/webpack-typescript-builder/master/LICENSE)

COPYRIGHT (C) 2017-2019 MOCODING, LLC

[npm-image]: https://img.shields.io/npm/v/webpack-typescript-builder.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/webpack-typescript-builder

[deps]: https://img.shields.io/david/mocoding-software/webpack-typescript-builder.svg
[deps-url]: https://david-dm.org/mocoding-software/webpack-typescript-builder
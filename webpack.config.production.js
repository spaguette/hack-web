require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var globals = require('./buildGlobals');

globals.getDefines("'production'");

// Основные настройки
var config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            /* React Loader with Babel and load */
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules(?![\/\\]@infinet[\/\\])/,
                include: __dirname,
                loaders: ['babel-loader'] // react-hot-loader, babel-loader
            },
            /* React Loader with Babel and hot load */
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract('css-loader?minimize&camelCase&localIdentName=[hash:base64:5]&importLoaders=3!postcss-loader!sass-loader' +
                    '?includePaths[]=' + (path.resolve(__dirname, './node_modules')) +
                    '!' + globals.prepend + '?appendData=' + globals.sassGlobals)
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer
        ];
    },
    plugins: [
        //Минификация
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            output: {
                comments: false
            }
        }),
        //Константы для прекомпиляции
        new webpack.DefinePlugin(globals.definePlugin),
        //Исключение дублей
        new webpack.optimize.DedupePlugin(),
        //CSS в файл
        new ExtractTextPlugin('styles.css')
    ]
};

module.exports = config;
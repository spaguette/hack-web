require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var globals = require('./buildGlobals');

globals.getDefines();

var serverHost = '0.0.0.0';
var serverPort = '8081';

// Основные настройки
var config = {
    cache: true,
    serverHost: serverHost,
    serverPort: serverPort,
    entry: [
        'webpack-dev-server/client?http://' + serverHost + ':' + serverPort,
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    devtool: 'eval-source-map',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [
            /* React Loader with Babel and hot load */
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [path.join(__dirname, 'src')],
                loader: 'babel', // react-hot-loader, babel-loader
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            /* React Loader with Babel and hot load */
            {
                test: /\.(css|scss)$/,
                loader: 'style-loader!css-loader?-minimize&camelCase&localIdentName=[name]__[local]___[hash:base64:5]&importLoaders=3!postcss-loader!sass-loader' +
                        '?includePaths[]=' + (path.resolve(__dirname, './node_modules')) +
                        '!' + globals.prepend + '?appendData=' + globals.sassGlobals
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer
        ];
    },
    plugins: [
        //Константы для прекомпиляции
        new webpack.DefinePlugin(globals.definePlugin),
        new webpack.SourceMapDevToolPlugin({}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = config;
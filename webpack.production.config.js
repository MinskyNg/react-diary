var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
          { from: './app/index.html', to: './index.html' },
          { from: './app/favicon.ico', to: './favicon.ico' },
          { from: './app/libs', to: './libs' }
        ]),
    ],
    devtool: 'cheap-source-map',
    entry: [
        path.resolve(__dirname, 'app/entry.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style!css' },
            { test: /\.scss$/, include: path.resolve(__dirname, 'app'), loader: 'style!css!sass' },
            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel' },
            { test: /\.(png|jpg)$/, include: path.resolve(__dirname, 'app'), loader: 'url?limit=8192' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};

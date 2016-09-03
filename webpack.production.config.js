var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
        new webpack.optimize.DedupePlugin(),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
          { from: './src/index.html', to: './index.html' },
          { from: './src/favicon.ico', to: './favicon.ico' }
        ]),
    ],
    devtool: 'cheap-source-map',
    entry: {
        index: [
            path.resolve(__dirname, 'src/index.js')
        ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss$/, include: path.resolve(__dirname, 'src/styles'), loader: 'style!css!sass' },
            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel' },
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};

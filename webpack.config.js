var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'js'),
                loader: 'babel-loader',
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    watch : true
};
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: ['./app/main.ts'],
    output: {
        path: path.resolve(__dirname, './public'),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 8088
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                {loader: "ts-loader"}
            ]}, {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        camelCase: true,
                        minimize: true,
                        localIdentName: "[local]_[hash:base64:5]"
                    }
                }
            ]
        }]
    }
};
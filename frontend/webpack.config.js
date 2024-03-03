const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
// const devtool = "source-map"

module.exports = {
    // devtool,
    entry: path.resolve(__dirname, "src", "catalog.js"),
    mode: 'production',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        publicPath: "/",
        assetModuleFilename: "assets/[name][ext]"
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./src/default.htm",
            }
        ),
        new MiniCssExtractPlugin(
           {filename: '[name].css'}
        ),
    ],

    devServer: {
        allowedHosts: "127.0.0.1",
        host: "127.0.0.1",
        port: 3000,
      },
    
    module: {
        rules: [
            {
                test: /\html$/i,
                loader: "html-loader",

                test: /\.(png|svg|jpg|jpeg|gif|ttf|eot|woff|css)$/i,
                type: "asset/resource",
                
            },

            {
                 test: /\.css$/i,
                 use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["whatwg-fetch", "./static/app.js"],
    output: {
        path: path.join(__dirname, "app/static"),
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'soundslike',
        })
    ]
};

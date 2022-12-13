const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV,
  devServer: {
    hot: true,
    proxy: {
      "/": "http://localhost:3000",
    },
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  entry: path.resolve(__dirname, "./client/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/dist",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./template.html",
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  // resolve: {
  //   fallback: {
  //     fs: false,
  //     os: false,
  //     path: false,
  //   },
  // },
};

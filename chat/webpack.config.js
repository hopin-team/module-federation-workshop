const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");

const port = 8888;

module.exports = {
  mode: "development",
  output: {
    publicPath: `http://localhost:${port}/`,
    filename: "[name].[contenthash].js",
  },
  devServer: {
    port,
    historyApiFallback: {
      index: "index.html",
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "chat",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
  ],
  entry: "./src/index.js",
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      // {
      //   test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
      //   use: [{ loader: 'file-loader' }],
      // },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      // {
      //   test: /\.scss|\.css$/,
      //   use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};

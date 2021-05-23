const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8886,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "stage",
      filename: "remoteEntry.js",
      exposes: {
        "./StageIndex": "./src/bootstrap.js",
      },
      shared: ["txtgen"],
    }),
  ],
};

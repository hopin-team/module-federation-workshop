const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const moduleFederationPlugin = require("./moduleFederationPlugin");

function webpackMicroConfig({ packageJson, outputPath, remotes }) {
  return merge(baseConfig({ packageJson }), {
    mode: "production",
    output: {
      filename: "[name].[contenthash].js",
      path: outputPath,
    },
    plugins: [
      moduleFederationPlugin({
        packageJson,
        remotes,
      }),
    ],
  });
}

module.exports = webpackMicroConfig;

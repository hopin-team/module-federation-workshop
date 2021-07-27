const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

function webpackNanoConfig({
  packageJson,
  outputPath,
  nanoName,
  fullNanoName,
}) {
  return merge(baseConfig({ packageJson, nanoName, fullNanoName }), {
    mode: "production",
    output: {
      filename: "[name].[contenthash].js",
      path: outputPath,
      publicPath: `/${fullNanoName}/latest`,
    },
  });
}

module.exports = webpackNanoConfig;

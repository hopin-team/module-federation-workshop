const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

function webpackNanoConfig({ packageJson, port, nanoName, fullNanoName }) {
  return merge(baseConfig({ packageJson, nanoName, fullNanoName }), {
    mode: "development",
    devServer: {
      port,
    },
  });
}

module.exports = webpackNanoConfig;

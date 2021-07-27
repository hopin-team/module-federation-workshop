const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const moduleFederationPlugin = require("./moduleFederationPlugin");

function webpackMicroConfig({ packageJson, port, remotes }) {
  return merge(baseConfig({ packageJson, port }), {
    mode: "development",
    devServer: {
      port,
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

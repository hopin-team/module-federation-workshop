const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

function webpackNanoConfig({ packageJson, port }) {
  const packageJsonDeps = packageJson.dependencies;

  return merge(baseConfig, {
    mode: "development",
    entry: "./nanos/schedule/src/index.jsx",
    devServer: {
      port,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "receptionNanos",
        filename: "remoteEntry.js",
        exposes: {
          "./Schedule": "./nanos/schedule/src/index.jsx",
          "./Sponsors": "./nanos/sponsors/src/index.jsx",
        },
        shared: {
          ...packageJsonDeps,
          react: {
            singleton: true,
            requiredVersion: packageJsonDeps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: packageJsonDeps["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            version: packageJsonDeps["react-router-dom"],
          },
        },
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
  });
}

module.exports = webpackNanoConfig;

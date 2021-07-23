const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const VirtualModulesPlugin = require("webpack-virtual-modules");
const { getRootDevName } = require("./utils");

const templateIndexHtml = ({ name }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${name}</title>
  </head>
  <body>
    <div id="${getRootDevName(name)}"></div>
  </body>
</html>
`;

function webpackMicroConfig({ packageJson, port }) {
  const packageJsonDeps = packageJson.dependencies;
  const { name } = packageJson;

  return {
    mode: "development",
    output: {
      publicPath: `http://localhost:${port}/`,
    },
    devServer: {
      port,
      historyApiFallback: {
        index: "/index.html",
      },
    },
    plugins: [
      new VirtualModulesPlugin({
        "./public/index.html": templateIndexHtml({ name }),
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new ModuleFederationPlugin({
        name,
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/bootstrap.js",
        },
        remotes: {
          nextjs2:
            "nextjs2@http://localhost:3001/_next/static/chunks/remoteEntry.js",
          receptionNanos: "receptionNanos@http://localhost:8880/remoteEntry.js",
        },
        shared: {
          ...packageJsonDeps,
          // react: {
          //   singleton: true,
          //   requiredVersion: packageJsonDeps.react,
          // },
          // "react-dom": {
          //   singleton: true,
          //   requiredVersion: packageJsonDeps["react-dom"],
          // },
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
}

module.exports = webpackMicroConfig;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const VirtualModulesPlugin = require("webpack-virtual-modules");

const templateIndexHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Profile/Schedule</title>
  </head>
  <body>
    <div id="root-profile-schedule-dev"></div>
  </body>
</html>
`;

const devBootstrap = `
import ReactDOM from "react-dom";
import Slice from "./index.jsx";
import { Root } from "../../../root";

ReactDOM.render(
  <Root>
    <Slice />
  </Root>,
  document.getElementById("root-profile-schedule-dev")
);
`;

const virtualModules = new VirtualModulesPlugin({
  "./public/index.html": templateIndexHtml,
  "./src/index.js": 'import("./devBootstrap.js");',
  "./src/devBootstrap.js": devBootstrap,
});

const port = 8880;

function webpackSliceConfig({ packageJson }) {
  const packageJsonDeps = packageJson.dependencies;

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
      virtualModules,
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new ModuleFederationPlugin({
        name: "receptionSliceSchedule",
        filename: "remoteEntry.js",
        exposes: {
          "./FeaturedSchedule": "./src/index.jsx",
        },
        remotes: {
          nextjs2:
            "nextjs2@http://localhost:3001/_next/static/chunks/remoteEntry.js",
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
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
                "@babel/preset-env",
              ],
              // plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
}

module.exports = webpackSliceConfig;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJsonDeps = require("./package.json").dependencies;

const port = 8886;

module.exports = {
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "reception",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/bootstrap.js",
      },
      remotes: {
        nextjs2:
          "nextjs2@http://localhost:3001/_next/static/chunks/remoteEntry.js",
        receptionSliceSchedule:
          "receptionSliceSchedule@http://localhost:8880/remoteEntry.js",
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

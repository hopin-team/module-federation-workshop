const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const VirtualModulesPlugin = require("webpack-virtual-modules");

module.exports = ({
  packageJson,
  nanoName,
  fullNanoName,
  sharedPackages = {},
}) => {
  const packageJsonDeps = packageJson.dependencies;

  return {
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
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
      ],
    },
    plugins: [
      new VirtualModulesPlugin({
        "./src/index.js": ``,
      }),
      new ModuleFederationPlugin({
        name: fullNanoName,
        filename: "remoteEntry.js",
        exposes: {
          "./Index": `./src/nanos/${nanoName}/index.jsx`,
        },
        // TODO ADD REMOTES FOR THE OTHER NANOS? so that a nano can import another nano?
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
          // TODO react-router-dom SHOULD NOT BE HARDCODED HERE
          "react-router-dom": {
            singleton: true,
            version: packageJsonDeps["react-router-dom"],
          },
          ...sharedPackages,
        },
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
